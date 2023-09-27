const express = require("express");
const userController = require("../controllers/user");
const { signup, login, logout, edit, me } = userController;
const userAuth = require("../middleware/userauth");

const router = express.Router();

//Setup User routes

//signup endpoint
//passing the middleware function to the signup
router.post("/signup", userAuth.saveUser, signup);

//login route
router.post("/login", login);

// logout route
router.post("/logout", userAuth.validSession, logout);

// edit route - edit user
router.post("/edit", userAuth.validSession, edit);

// me route, return user object for token
router.post("/me", userAuth.validSession, me);

module.exports = router