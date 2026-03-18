const Razorpay = require('razorpay');
const { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils.js');
const Payment = require('../models/payment.model');
const User = require('../models/user.model');

const PLANS = {
  '3_tokens': 149,
  '10_tokens': 499,
  'unlimited': 999
};

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  
  if (!key_id || !key_secret || key_id === 'dummy_key_id') {
      throw new Error("Razorpay API keys are missing in backend .env file. Please add RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET and explicitly restart the backend server (nodemon doesn't watch .env restarts).");
  }
  
  return new Razorpay({ key_id, key_secret });
}

async function createOrder(req, res) {
  try {
    const { planId } = req.body;
    if (!PLANS[planId]) {
      return res.status(400).json({ message: "Invalid plan selected" });
    }

    const amount = PLANS[planId] * 100; // Razorpay needs it in paise

    const options = {
      amount,
      currency: "INR",
    };

    const razorpay = getRazorpayInstance();
    const order = await razorpay.orders.create(options);

    await Payment.create({
      user: req.user.id,
      planId,
      orderId: order.id,
      amount: amount / 100, // DB saves real INR value
      currency: order.currency,
      status: 'pending',
    });

    res.status(200).json({ 
        message: "Order created successfully", 
        order 
    });
  } catch (error) {
    console.error("Create Order Error:", error);
    res.status(500).json({ message: error.message || "Error creating razorpay order" });
  }
}

async function verifyPayment(req, res) {
  try {
    const { razorpayOrderId, razorpayPaymentId, signature } = req.body;
    const secret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!secret) {
        throw new Error("Razorpay secret key is missing in backend .env");
    }

    const isValid = validatePaymentVerification(
        { "order_id": razorpayOrderId, "payment_id": razorpayPaymentId },
        signature,
        secret
    );

    if (!isValid) {
      return res.status(400).json({ message: "Invalid payment signature" });
    }

    const payment = await Payment.findOne({ orderId: razorpayOrderId });
    if (!payment) {
        return res.status(404).json({ message: "Payment record not found" });
    }

    if (payment.status === 'completed') {
        return res.status(400).json({ message: "Payment already verified" });
    }

    payment.paymentId = razorpayPaymentId;
    payment.signature = signature;
    payment.status = 'completed';
    await payment.save();

    const user = await User.findById(payment.user);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    if (payment.planId === '3_tokens') {
        user.tokens += 3;
    } else if (payment.planId === '10_tokens') {
        user.tokens += 10;
    } else if (payment.planId === 'unlimited') {
        user.unlimitedExpiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    }
    
    await user.save();

    res.status(200).json({ 
        message: "Payment verified successfully",
        user: { 
            tokens: user.tokens, 
            unlimitedExpiresAt: user.unlimitedExpiresAt 
        }
    });

  } catch (error) {
    console.error("Verify Payment Error:", error);
    res.status(500).json({ message: error.message || "Error verifying payment" });
  }
}

module.exports = { createOrder, verifyPayment };
