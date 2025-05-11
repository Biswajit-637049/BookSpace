const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: "https://img.freepik.com/free-vector/smiling-young-man-illustration_1308-174669.jpg?uid=R197596674&ga=GA1.1.1779185988.1729260852&semt=ais_hybrid&w=740"
    },
    role: {
        type: String,
        default: "user",
        enum: ["user", "admin"],
    },
    favourites: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    cart: [
        {
            type: mongoose.Types.ObjectId,
            ref: "books",
        },
    ],
    orders: [
        {
            type: mongoose.Types.ObjectId,
            ref: "order",
        },
    ],
},
    { timestamps: true }   //it will help for createdAt,updatedAt both come database
);
module.exports = mongoose.model("user", user);