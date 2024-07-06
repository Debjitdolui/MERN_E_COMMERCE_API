import express from "express";
import { addAdderss, getAddress } from "../Controllers/address.js";
import { Authenticated } from "../Middlewares/auth.js";

const router = express.Router();

//add address
router.post('/add', Authenticated, addAdderss)

//get address
router.get('/get',Authenticated,getAddress)

export default router;
