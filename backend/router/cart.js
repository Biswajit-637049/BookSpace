const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// put book to cart
router.put('/add-to-cart', authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookInCart = userData.cart.includes(bookid);
        if (isBookInCart) {
            return res.status(200).json({
                status: "success",
                message: 'Book already in cart',
            });
        }
        await User.findByIdAndUpdate(id, {
            $push: { cart: bookid },  //$push-adds a value to an array
        });
        return res.status(200).json({
            status: "success",
            message: 'Book added to cart'
        });
    } catch (error) {
        res.status(500).json({
            message: "An error occurred"
        });
    }
});
////remove book from cart
router.put('/remove-from-cart/:bookid', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.params;
        const { id } = req.headers;
        await User.findByIdAndUpdate(id, {
            $pull: { cart: bookid },  //removes from array
        });
        return res.status(200).json({
            status: "success",
            message: 'Book removed from cart',
        });
    } catch (error) {
        res.status(500).json({
            status: "success",
            message: 'An error occurred'
        });
    }
});
//get cart of a particular user
router.get('/get-user-cart', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('cart');// automatically replaces the user’s cart field (which likely holds an array of ObjectIds) with the full document data from the related Cart
        const cart = userData.cart.reverse(); //usually to show the latest added items first.
        return res.status(200).json({
            status: "success",
            message: 'Cart fetched successfully',
            data: cart
        });
    } catch (error) {
        res.status(500).json({
            message: 'An error occurred'
        });
    }
});
module.exports = router;