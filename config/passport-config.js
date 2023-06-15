const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

function initialize(passport) {
  const authenticateUser = async (username, password, done) => {
    console.log(`Authenticating user: `, username);
    const user = await User.findOne({ username: username });

    if (user == null) {
      console.log("No user found with that username");
      return done(null, false, { message: "No user with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        console.log("password matches, user authenticated");
        return done(null, user);
      } else {
        console.log("password incorrect");
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      console.log("error while comparing passwords", e);
      return done(e);
    }
  };

  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => {
    console.log("Serializing user: ", user.id);
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

module.exports = initialize;
