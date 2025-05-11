const router = require("express").Router();
const User = require("../models/user");
const Order = require("../models/order");
const { authenticateToken } = require("./userAuth");
const { json } = require("express");


//place order
router.post('/place-order', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { order } = req.body;

        for (const orderData of order) {
            const newOredr = new Order({
                user: id,
                book: orderData._id
            });
            const orderDataFromDb = await newOredr.save();

            //saving Order in user model
            await User.findByIdAndUpdate(id, {
                $push: { orders: orderDataFromDb._id },
            });

            //cleaning cart after placing order
            await User.findByIdAndUpdate(id, {
                $pull: { cart: orderData._id },
            });
        }
        return res.status(200).json({
            status: "success",
            message: 'Order placed successfully',
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Server error'
        });
    }
});
//get all orders history of a particular user
router.get('/get-order-history', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate({ // again check
            path: 'orders',                 //First, populate the orders field inside the user.
            populate: { path: 'book' },     //Then, inside each order, populate the book field.
        });
        const ordersData = userData.orders.reverse();
        return res.status(200).json({
            status: "success",
            data: ordersData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred'
        });
    }
});
//get all orders history of all users --admin
router.get('/get-all-orders', authenticateToken, async (req, res) => {
    try {
        const userData = await Order.find()
            .populate({
                path: 'book',
            }).populate({
                path: 'user',
            })
            .sort({ createdAt: -1 });
        return res.status(200).json({
            status: "success",
            data: userData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});
// update order --admin
router.put('/update-status/:id', authenticateToken, async (req, res) => {
    try {
        const {id}=req.params;
        await Order.findByIdAndUpdate(id,{status:req.body.status});
        return res.json({
            status:"success",
            message:"update successfully"
        })
    } catch (error) {
       console.log(err);
       return res.status(500).json({message:"An error occured"});
    }
});
module.exports = router;