import express from "express";
import {
  addToCart,
  clearCart,
  decreaseProudctQty,
  reomveProductFromCart,
  userCart,
} from "../Controllers/cart.js";

import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add To cart
router.post("/add", Authenticated, addToCart);

//get User cart
router.get("/user", Authenticated, userCart);

//remove product from cart
router.delete("/remove/:productId", Authenticated, reomveProductFromCart);

//clear cart
router.delete("/clear", Authenticated, clearCart);

//decrease item qty
router.post("/--qty", Authenticated, decreaseProudctQty);

export default router;
