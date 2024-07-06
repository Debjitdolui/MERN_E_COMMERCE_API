import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/user.js";
import productRouter from "./Routes/product.js";
import cartRouter from "./Routes/cart.js";
import addressRouter from "./Routes/address.js"
import paymentRouter from "./Routes/pyament.js"
import bodyParser from "express";
import cors from 'cors'

const app = express();

app.use(bodyParser.json());
const port = 1000;

app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials:true
}))

//home testing route
app.get("/", (req, res) => {
  res.send("hello user");
});
//user Router
app.use("/api/user", userRouter);

//product Router
app.use("/api/product", productRouter);

//cart Router
app.use("/api/cart", cartRouter);

//address Router 
app.use('/api/address', addressRouter)

//payment Router
app.use('/api/payment',paymentRouter)

mongoose
  .connect(
    "mongodb+srv://debjitdolui04:CdXbKyru0soT03ZZ@cluster0.jlrd74y.mongodb.net/",
    {
      dbName: "MERN_E_Commerce",
    }
  )
  .then(() => console.log("MongoDB Connected Successfully...!"))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log("server started");
});
