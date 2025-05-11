const express = require("express");
const app = express();
const cors=require("cors");
require("dotenv").config();
require("./conn/conn");
const User = require("./router/user");
const Book = require("./router/book");
const Favourite = require("./router/favourite");
const Cart = require("./router/cart");
const Order = require("./router/order");
app.use(express.json())
app.use(cors());
//routes
app.use("/api/v1", User);
app.use("/api/v1", Book);
app.use("/api/v1", Favourite);
app.use("/api/v1", Cart);
app.use("/api/v1", Order);

// creating port
app.listen(process.env.PORT, () => {
    console.log(`server started ${process.env.PORT}`);
})