const bcrypt = require("bcrypt")

const User = require("../models/userModel")

const register = async (request, response, next) => {
    const { username, password } = request.body;
   //Here, we'll import the bcrypt package to use the hash method, with three parameters - password, the number 10 which will then act as a salt that will be generated with the specified number of rounds and used, and an asynchronous function that has 2 parameters - error and a hashedPassword.
    //start
    bcrypt.hash(password, 10, async (error, hashedPassword)=> {
        //if statement 
        if (error) {
            return next(error)
        }
        // return done(null, user)
        const newUser = new User({
            username: username,
            password: hashedPassword, //convert to the hashedPassword
            googleId: "" //NEW Period 2 addition
        });
        await newUser.save() //keep

        //Use the request.login callback with 2 parameters newUser and (err) to hold the res.status.json
        request.login(newUser, (err) => {
            response.status(201).json({
                success: { message: "New user is created" },
                data: { username },
                statusCode: 201,
            });
        })
        
    })

   
}

const login = async (request, response, next) => {
    //Before the response, add a console.log that will use the request (chained with the dot method) to show the user.
    console.log(request.user);
    response.status(200).json({
        success: { message: "User logged in." },
        //We're going to modify the response.status.json to pull in data with a key of data and a value of an object with the key of username and a value of request.user.username
        data: {username: request.user.username},
        statusCode: 200,
    });
}

//No refactoring needed :]
const logout = async (request, response, next) => {
    response.json("You've reached the logout page. Logging off..."); //One optional change you can add to the logout handler is immediately after the start of the function, create a line that has a response.json() message string
    request.logout((error) => {
        if (error) {     
            response.json({
                error: { message: "Something went wrong when logging out" },
                statusCode: 400,
            });
         };
        response.json("Successfully logged out");
    });
};

module.exports = { register, login, logout };