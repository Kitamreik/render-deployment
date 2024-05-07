const siteData = require('../data/siteData')
//const bookInventory = require('../data/bookInventory'); //comment out

//define the model (instead as of period 4/5)
const Book = require('../models/bookModel');

//USE CTRL/CMD + F to find all bookInventory entries and change them to the Book Model

//Code NOT in starter code- Emulate a sample model:
const bookSample = async (request, response, next) => {
  const sampleModel = new Book({
    title: "Boruto: Two Blue Vortex",
    author: "Masashi Kishimoto",
    price: 4.99,
    starRating: 5,
    synopsis: "You have got your circumstances. Well, so does everyone else, but they come here despite them. Do not stand in their way. This is my story! - Boruto Uzumaki"
  })
  //the bookSample matches the bookSchema
  console.log(sampleModel)
  

  try {
    sampleModel.save(); //save the data
    //res.json("Sample route test") //success
    if (200) { //add await keyword
      await response.status(200).json({
        success: { message: "This route points to the Books sample" },
        data: sampleModel,
        statusCode: 200,
      })
    }
  } catch (error) {
    response.status(400).json({
      error: { message: "Resource not found. Search again." },
      statusCode: 400,
    })
  }
}

//2nd Refactoring Wave: upgrading the await to use the .find() method and the .then method as the container for the res.status().json()

const getAllBooks = async (request, response, next) => {
  //Comment out the try line and replace it with the await keyword so the model is called, chained to the .find() method, chained to the .then() method with a parameter of books and ending with an arrow.
  if (200) { 
    await Book.find({}).then((books) =>
      //move the res.status.json here
      response.status(200).json({
        success: { message: "This route points to the Books page with all of the books" },
        data: books, siteData, //Next, within the .json object, change the data value to the books parameter to pass the data.
        statusCode: 200,
      })
    )
    //move the res.status.json up. If you have no errors after refactoring, delete the try statement lines if you want.
  }
  //We don't need to catch errors after this line. Make sure to place the catch statement in a multi line comment or delete it.
  } 

const getBook = async (request, response, next) => {
  const { _id } = request.params;

  //Make sure that you comment this line out: const foundBook = bookInventory.find(bookInventory => bookInventory._id === Number(_id));
  //const foundBook = Book.find(Book => Book._id === Number(_id)); //you should have this line after you replaced all the values.
  //we do not need the entire try-catch statement below
 
  //instead use the await + Book + .findOne() method skeleton, which has an object as a parameter and a key-value pair of _id: _id
  await Book.findOne({_id: _id}).then((books) => { //chained to the .then() method with a parameter of books and ending with an arrow and a starting curly brace.
    response.status(200).json({
      success: { message: "This route points to the Books page with one of the books by the ID" },
      data: books, siteData, //Next, within the .json object, change the data value to the books parameter 
      statusCode: 200
    });  
  })
};

module.exports = { getAllBooks, getBook, bookSample }; //Make sure that module.exports is still active and correct.