const router = require("express").Router();
const User = require("../models/user");
const { authenticateToken } = require("./userAuth");

// add book to favourite
router.put("/add-book-to-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            return res.status(200).json({
                success: true,
                message: 'Book already in favourites',
            });
        }
        await User.findByIdAndUpdate(id, { $push: { favourites: bookid } });
        return res.status(200).json({ message: "Book added to favourites" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server error" });
    }
});
// delete book to favorite
router.delete("/delete-book-from-favourite", authenticateToken, async (req, res) => {
    try {
        const { bookid, id } = req.headers;
        const userData = await User.findById(id);
        const isBookFavourite = userData.favourites.includes(bookid);
        if (isBookFavourite) {
            await User.findByIdAndUpdate(id, { $pull: { favourites: bookid } }); // remove from any array elememt
        }
        return res.status(200).json({ message: "Book remove from favourites" });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal Server error" });
    }
});
// get favorite books of particular user
router.get("/get-favourite-books", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const userData = await User.findById(id).populate('favourites');
        const favouriteBooks = userData.favourites;
        if (!userData) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }
        return res.status(200).json({
            success: true,
            message: 'Favourite books fetched successfully',
            data: favouriteBooks,
        });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ message: "An error occured" });
    }
});
module.exports = router;