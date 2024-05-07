//define express 
const express = require("express");
//require passport (auth unit)
const passport = require("passport");

// Define express and router using express.Router()
const router = express.Router();

const { register, login, logout } = require("../controllers/siteController"); // Add the following to the constant variable where the controllers are summoned: {register, login, logout} and require the siteController file

//router.get("/register", register); //for testing purposes
// Stage a post route of /register where there is a callback function is register
router.post("/register", register);

//router.get("/login", login); //for testing purposes
// Stage a post route of /login where there is a callback function called login. We’ll refactor this later.
//router.post("/login", login); //COMMENT THIS OUT PLIS

//Refactored login post route
router.post("/login",
    passport.authenticate("local", { //Tell passport to authenticate two parameters: “local”
        failureRedirect: "/login/error", //an object that has a failureRedirect key with a value of “/login/error”
        failureMessage: true, //failureMessage key with a value of true
    }),//Place a comma at the end of the code block.
login);

// Stage a get route of /login/error where there is a callback function of (request, response, next) and a response.json message of “Login Error”
router.get("/login/error", (request, response, next) => {
    response.json("Login error");
});

// Stage a get route of /logout where there is a callback function logout
router.get("/logout", logout);

module.exports = router;
// Make sure to export the router using module.exports()