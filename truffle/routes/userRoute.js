const express = require("express")
const router = express.Router();
const User = require("../models/userModel")

router.route("/register").post((req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    const address = req.body.address;
    const newUser = new User({
        user,
        password,
        address
    });

    newUser.save();
    res.send('Registration Succesful!');
})

router.route("/login").post((req, res) => {
    const user = req.body.user;
    const password = req.body.password;
    User.findOne({ user: { $eq: user } }).then(foundUser => {
        if (!foundUser || foundUser.password != password) res.send('Incorrect Username or Password.')
        res.send('Login Successful!')
    })
})

module.exports = router;