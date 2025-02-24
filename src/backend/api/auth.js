const express = require("express")
const bcrypt = require("bcrypt")
const User = require("../models/User")

const router = express.Router();

// registration
router.post("/register", async (req, res) => {
    const {name, surname, email, password} = req.body

    const existingUser = await User.findOne({email});
    if (existingUser) {
        return res.status(400).json({error: "User with this already exists"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        name: name,
        surname: surname,
        email: email,
        password: hashedPassword
    })

    try {
        await newUser.save()
        return res.status(201).json({message: "User created successfully"})
    } catch (err) {
        console.error("Error during registration:", err)
        return res.status(500).json({error: "Failed to create new User", details: err.message});
    }
});

// Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        return res.status(200).json({ message: "Login successful!" });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ error: "Internal server error", details: err.message });
    }
});

module.exports = router;