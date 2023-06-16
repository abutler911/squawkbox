const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const squawkRoutes = require("./routes/squawkRoutes");
const passport = require("passport");
const initializePassport = require("./config/passport-config");
const flash = require("connect-flash");
const methodOverride = require("method-override");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(methodOverride("_method", { methods: ["POST", "GET"] }));

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index");
});
app.use("/", userRoutes);
app.use("/", squawkRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
