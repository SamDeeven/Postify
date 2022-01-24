const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require('../keys')
const requireLogin = require('../middleware/requireLogin')



// Sign up
router.post('/signup', (req, res) => {
    const { name, country, email, password } = req.body

    if (!email || !password || !name || !country) {
        return res.status(422).json({
            error: "Enter all fields"
        });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    status: "Failed",
                    message: "User already Registered with this Email"
                })
            }

            bcrypt.hash(password, 10)
                .then(hashedpassword => {
                    const user = new User({
                        name,
                        country,
                        email,
                        password: hashedpassword
                    })
                    user.save()
                        .then(user => {
                            res.json({ status: "Success", message: "Registered Successfully" })
                        })
                        .catch(err => {
                            res.json({ status: "Failed", message: err })
                        })
                })


        })
        .catch(err => {
            res.json({ status: "Failed", message: err })
        })
});

// Sign in
router.post('/signin', (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).json({ status: "Failed", message: "Please provide Email or password" });
    }
    User.findOne({ email: email })
        .then(savedUser => {
            if (!savedUser) {
                return res.status(422).json({ status: "Failed", message: "Invalid Email or Password" })
            }
            bcrypt.compare(password, savedUser.password)
                .then(ifMatched => {
                    if (ifMatched) {

                        const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET)
                        const { _id, name, email } = savedUser
                        res.json({ status: "Success", message: "Signed in", token, user: { _id, name, email } })
                    } else {
                        return res.status(422).json({ status: "Failed", message: "Invalid Email or Password" })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        })
});




module.exports = router