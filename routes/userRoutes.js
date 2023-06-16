const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const multer = require("multer");
const path = require("path");
const passport = require("passport");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/profiles");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  },
});

// Create the multer upload instance
const upload = multer({ storage: storage });

router.get("/register", (req, res) => {
  res.render("register", { user: req.user });
});

router.post("/register", upload.single("profilePicture"), async (req, res) => {
  const { firstName, lastName, email, username, password } = req.body;
  const { profilePicture } = req.file;

  try {
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password,
      profilePicture: req.file.filename,
    });

    await user.save();
    res.redirect("/login");
  } catch (err) {
    console.log(err);
    res.redirect("/register");
  }
});

router.get("/login", (req, res) => {
  res.render("login", { user: req.user });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {
    console.log("User authentication succeeded!");
  }
);

router.get("/logout", ensureAuthenticated, (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error(err);
      return res.redirect("/dashboard");
    }
    res.redirect("/");
  });
});

module.exports = router;
