require('dotenv').config();
require('./config/connection');
require('./config/authStrategy'); //reactivate in auth unit

//Hello World!

//Packages
const express = require("express");

//Middleware
const morgan = require("morgan");
const path = require("node:path");

//init the app and the port
const app = express();
const PORT = process.env.PORT || 4000; //port change to minimize server clashes
const cors = require("cors"); //define cors after the port 
const helmet = require("helmet"); //added
const session = require("express-session"); //added
const passport = require("passport"); //added

app.use(morgan("dev")); //combined
//----------------------------------------------------
//define the routing variable for authorsRoutes
const booksRoutes = require('./routes/booksRouter');

//here
const authorsRoutes = require('./routes/authorsRouter');

//Summon adminRoutes files
const adminRouter = require('./routes/adminRouter')

//Summon siteRoutes files
const siteRouter = require('./routes/siteRouter')
//----------------------------------------------------
//J-SON Derulo 
app.use(express.json());

//encode forms 
app.use(express.urlencoded({ extended: true }));

//false - querystring library
//true- the qs library, default is true

//use the public directory
app.use(express.static(path.join(__dirname, "public")));

//use cors - please disable until auth unit. It will prevent the server from running.
app.use(cors()); //make sure to add the () here 
app.use(helmet()) //tell the app to use helmet 

//-----------------------NEW CODE RE: AUTH-----------------------------
app.use(
    session({
      secret: process.env.SECRET_KEY,
      resave: false,
      saveUninitialized: false,
    })
  ); //Tell the app to use express-session, with the secret key and the value that is stored within the .env file, the resave key with a value of false and the saveUnitialized key with a value of false. 
  
  app.use(passport.initialize()); //Next, tell the app to initialize passport 
  app.use(passport.session()); //Then, tell the app to tell passport to use the session.

//----------------------------------------------------
//Test this route. Is it operational? If not, what can you do to make it work? What file are you getting the data from?
const siteData = require('./data/siteData');

app.get("/", (request, response, next) => {
    // response.status(200).json({success: {message: "Index successful. Keep this route always for the apps you make."},  data: {siteData},  statusCode: 200});
    response.send(`

      <!DOCTYPE html>
      <html lang="en">

      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Test</title>
      </head>

      <body>
      <h1>Test for Deployment</h1>
      <p>Hello World! Are you able to see this?</p>
      </body>

      </html>
    `)
});

//----------------------------------------------------
//Tell the app to use the routing variables you defined earlier, booksRoutes, authorsRoutes.. etc
app.use(booksRoutes);
app.use(authorsRoutes);
app.use(adminRouter);
app.use(siteRouter);

//----------------------------------------------------
//Server
app.listen(PORT, () => {
    //SEND A MESSAGE
    console.log(`Carol's bookstore server is listening on port ${PORT}`);
    //go to localhost 
    console.log(`http://localhost:${PORT}/`);
    //NEW: protect all secrets
    console.log(`class DB: ${process.env.CLASS_DB}`)
    //add Google Dev console
    console.log(`All authentication is active and live...`) //NEW
    //track auth APIs
    console.log(`GitHub app: ${process.env.GITHUB_APP}`)
    console.log(`Google Dev console: ${process.env.CLASS_GOOGLE_DEV}`) //NEW
    console.log(`Render dashboard: ${process.env.RENDER_DASHBOARD}`)
    console.log(`MongoDB connection loading...`) //NEW
});
