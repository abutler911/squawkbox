const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const userRoutes = require("./routes/userRoutes");
const expressLayouts = require("express-ejs-layouts");
const connectDB = require("./config/database");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
connectDB();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use("/", userRoutes); // Add this line

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
