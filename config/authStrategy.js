const passport = require("passport"); //added
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy; //added, Define the LocalStrategy, requiring the passport-local package and using the Strategy class.

//Define the github strategy
const GithubStrategy = require('passport-github').Strategy;

//Define google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require("../models/userModel");

/*
const verify = async (request, response, next) => {
    bcrypt.compare(password, user.password, (error, result) => {
    	// result == true
      
        return done(null, user);
    });

}
*/


//we have the verify function here as basic authentication (login) to compare from the register function
//---------------------UPGRADING PERIOD 2-------------------
passport.use( //Tell passport to use the new LocalStrategy you set up.
    new LocalStrategy(
        (verify = (username, password, done) => { //Stage a (new) verify function that is able to use the User model to findOne user by their username.
        User.findOne({ username: username }).then((user) => {
            if (!user) {//IF there is NOT a found user, we’ll use the done parameter as a callback to tell us there is not a user.
                return done(null, false, { message: "User not found" });
            }
            bcrypt.compare(password, user.password, (error, result) => { 
            //If there is a user, use bcrypt to compare the password entered with the one stored. Console.log the result to check if there’s a match.
            if (error) {
                return done(error); //If there’s an error in comparison, return the error with the done callback.
            }
              return done(null, user); 
              //Otherwise, return the done callback with the user.
            });
        });
        })
    )
);

//--------------------PERIOD 3----------------------
//implement the github strategy
passport.use(new GithubStrategy({ //container to use the strategy
    clientID: process.env.GITHUB_CLIENT_ID, 
    clientSecret: process.env.GITHUB_CLIENT_SECRET, 
    callbackURL: 'http://localhost:3000/auth/github'
}, 
    (accessToken, refreshToken, profile, done) => { 
    console.log(profile); 
    return done(null, profile); 
    })
);
  
//implement the google strategy
passport.use(new GoogleStrategy({ 
    clientID: process.env.GOOGLE_CLIENT_ID, 
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/google/admin'
    },
    (accessToken, refreshToken, profile, done) => { 
        console.log(profile); 
        return done(null, profile); 
    })
);



//---------------------UPGRADING PERIOD 2-------------------
//Using the passport documentation, we'll use the syntax to serialize and deSerialize the user. This should be at the bottom of the file.
passport.serializeUser((user, done) => {
    done(null, user);
});
  
passport.deserializeUser((user, done) => {
    done(null, user);
});