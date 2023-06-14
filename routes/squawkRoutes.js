const express = require("express");
const router = express.Router();

// Display the dashboard
router.get("/dashboard", (req, res) => {
  // Fetch squawks from the database and render the dashboard view
  res.render("dashboard", { squawks });
});

// Handle squawk creation
router.post("/squawks", (req, res) => {
  // Process the submitted squawk and save it to the database
  res.redirect("/dashboard");
});

module.exports = router;
