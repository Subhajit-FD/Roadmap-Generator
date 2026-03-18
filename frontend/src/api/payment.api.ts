import api from "./axios.config";

export const createOrder = async (planId: string) => {
  try {
    const response = await api.post("/payment/orders", { planId });
    return response.data;
  } catch (error) {
    console.error("Create order error:", error);
    throw error;
  }
};

export const verifyPayment = async (data: { razorpayOrderId: string; razorpayPaymentId: string; signature: string }) => {
  try {
    const response = await api.post("/payment/verify", data);
    return response.data;
  } catch (error) {
    console.error("Verify payment error:", error);
    throw error;
  }
};
