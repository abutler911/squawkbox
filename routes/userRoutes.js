const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;

  const user = new User({ firstName, lastName, email, username, password });

  try {
    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      // User not found, redirect back to login page
      res.redirect("/login");
      return;
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      // Password is correct, set up a session for the user and redirect to the dashboard or home page
      req.session.userId = user._id;
      res.redirect("/dashboard"); // Replace "/dashboard" with your desired route
    } else {
      // Password is incorrect, redirect back to login page
      res.redirect("/login");
    }
  } catch (err) {
    console.error(err);
    res.redirect("/login");
  }
});

module.exports = router;
