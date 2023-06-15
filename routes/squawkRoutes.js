const express = require("express");
const router = express.Router();
const Squawk = require("../models/Squawk");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated.js");

// Display the dashboard
router.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    const squawks = await Squawk.find()
      .populate("user")
      .populate("comments.user")
      .sort({ createdAt: -1 });
    res.render("dashboard", { squawks, user: req.user });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

// Handle squawk creation
router.post("/squawks", ensureAuthenticated, async (req, res) => {
  console.log(req.user);
  const { squawk } = req.body;

  // Create a new squawk object
  const newSquawk = new Squawk({
    user: req.user.id,
    message: squawk,
  });

  try {
    await newSquawk.save();
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

module.exports = router;
