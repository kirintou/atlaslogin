// routes/userRoutes.js

const express = require('express');
const User = require('../model/model');
const router = express.Router();

const mongoose = require('mongoose');


// Showing home page
router.get("/", async (req, res) => {
    res.render("home");
});

// Showing secret page
router.get("/secret", isLoggedIn, async (req, res) => {
    res.render("secret");
});

// Showing register form
router.get("/register", async (req, res) => {
    res.render("register");
});

// Handling user signup
router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            return res.status(400).json({username:"a user has already registerd with this"});
        } else {
            const newuser = new User({
                username: req.body.username,
                password: req.body.password
            });
            newuser.save()
            .then(user => {
            console.log('User created:', user);
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
        return res.status(200).json(newuser);
        }
    } catch (error) {
        res.status(400).json({ error });
    }

    
});

// Showing login form
router.get("/login", async (req, res) => {
    res.render("login");
});

// Handling user login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (user) {
            const result = req.body.password === user.password;
            if (result) {
                res.render("secret");
            } else {
                res.status(400).json({ error: "password doesn't match" });
            }
        } else {
            res.status(400).json({ error: "User doesn't exist" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
});

router.get("/logout", async (req, res) => {
        if (err)  return next(err);
        res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}



module.exports = router;