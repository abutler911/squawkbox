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

// Handle comment creation
router.post("/squawks/:id/comments", ensureAuthenticated, async (req, res) => {
  const squawkId = req.params.id;
  const { comment } = req.body;

  try {
    // Find the squawk by ID
    const squawk = await Squawk.findById(squawkId);

    if (!squawk) {
      console.log("Squawk not found");
      return res.redirect("/dashboard");
    }

    // Create a new comment object
    const newComment = {
      user: req.user._id,
      text: comment,
    };

    // Add the comment to the squawk's comments array
    squawk.comments.push(newComment);

    // Save the squawk with the new comment
    await squawk.save();

    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

// Delete a squawk
router.delete("/squawks/:id", ensureAuthenticated, async (req, res) => {
  try {
    await Squawk.findByIdAndRemove(req.params.id);
    res.redirect("/dashboard");
  } catch (err) {
    console.error(err);
    res.redirect("/dashboard");
  }
});

module.exports = router;
