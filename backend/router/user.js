const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");// password change to large format
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth")
//Sign up
router.post("/sign-up", async (req, res) => {
    try {
        const { username, email, password, address } = req.body;
        // check username length more then 3
        if (username.length < 4) {
            return res
                .status(400)
                .json({ message: "username must be grater then 3" })
        }
        // check username already exits
        const existingUsername = await User.findOne({ username: username });
        if (existingUsername) {
            return res.status(400).json({ message: "username already exits" })
        }
        // check user email already exits
        const existingEmail = await User.findOne({ email: email });
        if (existingEmail) {
            return res.status(400).json({ message: "useremail already exits" })
        }
        //check password length
        if (password.length <= 5) {
            return res
                .status(400)
                .json({ message: "password must be greater then 5" })
        }
        const hashPass = await bcrypt.hash(password, 10); //meaning of 10 :It automatically adds a unique salt to each password
        const newUser = new User({
            username: username,
            email: email,
            password: hashPass, //hashPass:It takes a plaintext password and produces a hashed version that can be safely stored in a database
            address: address
        });
        await newUser.save();
        return res.status(200).json({ message: "Sign-up is successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Internal server error" })
    }
});

// sign in
router.post("/sign-in", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ username });
        if (!existingUser) {
            res.status(500).json({ message: "User name not exits" })
        }
        await bcrypt.compare(password, existingUser.password, (err, data) => {
            if (data) {
                const authClaims = [
                    { name: existingUser.username },
                    { role: existingUser.role }
                ];
                const token = jwt.sign({ authClaims }, "bookStore123", { expiresIn: "30d" });//sign :create token and bookStore123:your secret key to digitally sign the token
                res.status(200)
                    .json({
                        id: existingUser._id,
                        role: existingUser.role,
                        token: token
                    });
            }
            else {
                res.status(400).json({ message: "Invalid password" })
            }
        })
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//get-user-information
router.get("/get-user-information", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const data = await User.findById(id).select("-password");//exclude the password field from the document returned by findById().
        return res.status(200).json(data);
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
});

// update address
router.put("/update-address", authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const { address } = req.body;
        await User.findByIdAndUpdate(id, { address: address })
        return res.status(200).json({ message: "address update sucessfully" });
    }
    catch (err) {
        res.status(500).json({ message: "Internal server error" })
    }
});
module.exports = router;