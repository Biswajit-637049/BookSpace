const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book");
const { authenticateToken } = require("./userAuth");

//add book --admin
router.post("/add-book", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res
                .status(400)
                .json({ message: "You are not having to acces to perform admin work" })
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language
        });
        await book.save();
        res.status(200).json({ message: "Book add successfully" })
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
});
// update book
router.put('/update-book', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const book = await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        }, { new: true });
        return res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            book: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});
//delete book --admin
router.delete('/delete-book', authenticateToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        const book = await Book.findByIdAndDelete(bookid);
        return res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            book: book,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});
//get all books
router.get('/get-all-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }); // -1 desending order, most recently created come first
        return res.json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});
//get recently added books limit 4
router.get('/get-recent-books', async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 }).limit(4);//order arranged by recent add only 4 book come
        return res.json({
            status: "success",
            data: books
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});
//get book by id
router.get('/get-book-by-id/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "success",
            data: book
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred',
            error: error.message,
        });
    }
});


module.exports = router;