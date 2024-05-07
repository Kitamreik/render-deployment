//Let's use the bookController to clean up this file :]
const siteData = require('../data/siteData');
//const authorInventory = require('../data/authorInventory');

const Author = require('../models/authorModel');

const authorSample = async (request, response, next) => {
  const miniAuthor = new Author({
    firstName: "CodeSquad",
    lastName: "Cohort 2024",
    birthYear: 2024,
    bio: "We da best Back End coders out there, give us dat money"
  })

  console.log(miniAuthor);
  try {
    miniAuthor.save();
    //res.json("Kit actually coded this and it works...")

    if (200) {
      //res.status.json
      await response.status(200).json({
        success: { message: "This route points to the Author's sample" },
        data: miniAuthor,
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

const getAllAuthors = async (request, response, next) => {
//formerly start of try statement

    if (200) {
      await Author.find({}).then((authors) =>
        //container for...
        response.status(200).json({
          success: { message: "This route points to the Authors page with all of the authors" },
          data: authors, siteData,
          statusCode: 200,
        })
      )
       
    } 
  } 
  /*
  catch (error) {
      response.status(400).json({
        error: { message: "Resource not found. Search again." },
        statusCode: 400,
      })
    }
  */
  //no more try-catch b/c connection.js handles mongoDB connection or the server will crash if it can't access data
  //}; //formerly end of try statement
const getAuthor = async (request, response, next) => {
    const { _id } = request.params;
  
    //const foundAuthor = Author.find(Author => Author._id === Number(_id));

    /*
      try {
    if (200) {
      let params = request.params; //store the request.params object in variable
      console.log(params); //console log variable. Read the server.
      if (params._id === '001') {
        response.status(200).json({success: {message: "This is the 1st page from the Author Inventory "}, data: foundAuthor,
        statusCode: 200});
        } else if (params._id === '002') {
        response.json({success: {message: "This is the 2nd page from the Author Inventory "},
        statusCode: 200});
        } else if (params._id === '003') {
        response.json({success: {message: "This is the 3rd page from the Author Inventory "},
        statusCode: 200});
        } else { //If there is not a match, console.log "This book doesn't exist. Try searching again."
        console.log("This book doesn't exist. Try searching again.");        
        };
      
    } 
  } catch (error) {
    console.log(error);
      response.status(400).json({
        error: { message: "This book doesn't exist. Try searching again. Catch" },
        statusCode: 400,
      })
    }
    */

    //instead use the await + Author + .findOne() method skeleton, which has an object as a parameter and a key-value pair of _id: _id
  await Author.findOne({_id: _id}).then((authors) => { //chained to the .then() method with a parameter of books and ending with an arrow and a starting curly brace.
    response.status(200).json({
      success: { message: "This route points to the Authors page with one of the books by the ID" },
      data: authors, siteData, //Next, within the .json object, change the data value to the books parameter 
      statusCode: 200
    });  
  })
  };

  module.exports = { getAllAuthors, getAuthor, authorSample };