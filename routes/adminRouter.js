//define express 
const express = require("express");
const passport = require("passport"); //added

//const { response } = require("express"); //random lines of code such as this one can generate in your Back End while you are doing psuedocode, which may not have the correct syntax. Comment lines of code like this out.

//Define express and router using express.Router()
const router = express.Router();

//Add the following to the constant variable where the controllers are summoned: {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor} and require the adminController file
const {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor} = require("../controllers/adminController")

///-------- NEW FUNCTION ----------------- 
//Make a comment that says “checkAuthentication routing”
const checkAuthentication = (request, response, next) => {
    if (request.isAuthenticated()) {
        return next();
    } else {
        response.redirect(403, "/unauthenticated"); //notice the change here from the json syntax. If the user is not an admin, we need to send them back to the unauthenticated route to catch them and trigger a secondary response below.
    }
};

//Underneath that, make a comment that says “checkAuthentication route”
//------

//Then, stage a get route of /admin where there is a callback function that has the below routes inside of it.
router.get("/admin", checkAuthentication, (request, response, next) => { //NEW: add the checkAuthentication function as a parameter BEFORE THE TRIO

    //Now, if you test the /admin route, you should see a message that says “Forbidden. Redirecting to /unauthenticatedLinks to an external site.”. If you click on that link, it will say: “Cannot GET /unauthenticated”. Can you guess why? (We haven’t made the GET route yet!)

    //unless we...
    try {
    //Add res.json message to test route
    //response.json("Admin test successful");
    
   //Write a comment that says "/auth". This will be a nested route check so the path would be: "/admin/auth"
    router.get("/auth", (request, response, next) => {
        response.json("Authenticated");
    });


   //------
   //Remember that: .get(), .post(), .put(), and .delete() are routing methods that allow CRUD Operations to happen. It will lead to the function found in the controller. Make sure to use router for all of the routes.
 
   router.post("/create-book", createBook);
   router.put("/books/:_id/edit", editBook);
   router.delete("/books/:_id/delete", deleteBook);

   router.post("/create-author", createAuthor);
   router.put("/authors/:_id/edit", editAuthor);
   router.delete("/authors/:_id/delete", deleteAuthor);

    } catch (error) {
        console.log(error)
    } 
});

//optional to test
/*
router.get("/admin/auth", (request, response, next) => {
    response.json("Authenticated");
});
*/
//------
// Then make a comment that says “/unauthenticated”
router.get("/unauthenticated", (request, response, next) => {
    response.redirect("/"); //notice the change here from the json syntax. If the user is not an admin, we need to send them back to the homepage.
});
 //--- for testing purposes as you build nested routes if NOT using get ----
 router.get("/admin/create-book/", (request, response, next) => {
    response.json("You're in the admin path to create a book! Look at the magic of Back End development")
})

//--------PERIOD 3-------------

//implement Google Strategy

//GET to the path of /login/google with passport authentication of the google route and providing a scope object of an array with a string of profile
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));

//GET to the path of /login/google/failed with a callback that has a res.status.json where the message states that "There is a problem with Google Authentication".
router.get('/login/google/failed', (req, res, next) => {
    res.json({ message: 'There is a problem with Google authentication.' });
});

//Lastly, GET to the path of /auth/google with passport authentication of the google route and providing a successRedirect to / AND a failureRedirect to /login/local/failed
router.get('/auth/google/admin', passport.authenticate('google', {
  successRedirect: '/',
  failureRedirect: '/login/google/failed'
}));

// github strategy
//Direction: we'll need to implement three different routes here to get our GitHub Strategy.
//GET to the path of /login/github and a second parameter that allows passport to authenticate a string of github
router.get('/login/github', passport.authenticate('github'));

//GET to the path of /login/github/failed with a callback that has a res.status.json where the message states that "There is a problem with Github Authentication".
router.get('/login/github/failed', (req, res, next) => {
  res.json({ message: 'There is a problem with GitHub authentication.' });
});

//Lastly, GET to the path of /auth/github with passport authentication of the github route and providing a successRedirect to / AND a failureRedirect to /login/github/failed
router.get('/auth/github', passport.authenticate('github', {
  successRedirect: '/',
  failureRedirect: '/login/github/failed'
}));

module.exports = router;
