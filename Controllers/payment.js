
import Razorpay from "razorpay";
import { Payment } from "../Models/Payment.js";
import dotenv from "dotenv";

dotenv.config();

const rezorpay = new Razorpay({
  // key_id: "rzp_test_3h5qNr7Zn62WFk",
  // key_secret: "0elJ9mGCcv3bUR8F5MybVdij",
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

//checkout
export const checkout = async (req, res) => {
  const { amount, cartItems, userShipping, userId } = req.body;

  var options = {
    amount: amount * 100,
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
  };

  const order = await rezorpay.orders.create(options);

  res.json({
    orderId: order.id,
    amount: amount,
    cartItems,
    userShipping,
    userId,
    payStatus: "created",
  });
};

//verify and save to db
export const verify = async (req, res) => {
  const {
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
  } = req.body;

  let orderConfirm = await Payment.create({
    orderId,
    paymentId,
    signature,
    amount,
    orderItems,
    userId,
    userShipping,
    payStatus: "paid",
  });

  res.json({ message: "payment successfull..", success: true, orderConfirm });
};

//user specificorder
export const userOrder = async (req, res) => {
  let userId = req.user._id.toString();
  // console.log(userId)
  let orders = await Payment.find({ userId: userId }).sort({ orderDate: -1 });
  res.json(orders);
};

// user specificorder
export const allOrders = async (req, res) => {
  let orders = await Payment.find().sort({ orderDate: -1 });
  res.json(orders);
};
