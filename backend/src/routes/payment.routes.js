const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const paymentController = require("../controllers/payment.controller");

const paymentRouter = express.Router();

paymentRouter.post("/orders", authMiddleware.authUser, paymentController.createOrder);
paymentRouter.post("/verify", authMiddleware.authUser, paymentController.verifyPayment);

module.exports = paymentRouter;
