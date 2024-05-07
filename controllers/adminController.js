//Comment these out
// const bookInventory = require("../data/bookInventory");
// const authorInventory = require("../data/authorInventory");

//define the model (instead as of period 4/5)

//Admin Ctrl: C + U  + D w/ try-catch statements to double check us as the admin and webmaster!

//BOOK
const Book = require('../models/bookModel');
//AUTHOR
const Author = require('../models/authorModel');

const createBook = async (request, response, next) => {
    const { title, author, price, starRating, synopsis } = request.body; //form inputs that the user enters on the form

    //save the data over a blueprint for every NEW instance
    const newBook = new Book({
        title: title,
        author: author,
        price: price,
        starRating: starRating,
        synopsis: synopsis,
      });
    
    try {
        await newBook.save(); //save that book

        //check if the book is saved
        response
        .status(201)
        .json({ success: "A new book is created", data: newBook, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while creating a book", data: newBook, statusCode: 400 });
    }
};

//editBook
const editBook = async (request, response, next) => {
    const { _id } = request.params;

    const { title, author, price, starRating, synopsis } = request.body;

    const updatedBook = {
        title: title,
        author: author,
        price: price,
        startRating: starRating,
        synopsis: synopsis,
    };

    await Book.findByIdAndUpdate({ _id: _id }, updatedBook);

    //check if the book was updated!!
    try {
        response.status(200).json({
            success: `The book with id ${_id} is updated successfully`,
            data: updatedBook,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while editing a book", statusCode: 400 });
    }
};

//deleteBook
const deleteBook = async (request, response, next) => {
    const { _id } = request.params;

    await Book.findByIdAndDelete({ _id: _id });

    //CHECK to see if we found the right one to say goodbye to forever!!
    try {
        response.status(200).json({
            success: `The book with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) { //we want to know if there isn't a match because deletes are permanent!!!
        response
        .status(400)
        .json({ error: "Something happened while deleting a book", statusCode: 400 });
    }
};

//----------------
// You will need to create all of the handlers to use the following Mongoose functionality below 
// createAuthor: make sure that the newAuthor.save method is in the try statement
// editAuthor: Refactor any lines of code that say authorInventory to use our Author model instead
// deleteAuthor: Refactor any lines of code that say authorInventory to use our Author model instead
//---------------

//createAuthor
const createAuthor = async (request, response, next) => {
    const { firstName, lastName, birthYear, bio } = request.body;

    const newAuthor = new Author({
        firstName: firstName, 
        lastName: lastName, 
        birthYear: birthYear, 
        bio: bio 
      });
    
   

    try {
         await newAuthor.save();
        response
        .status(201)
        .json({ success: "A new author is created", data: newAuthor, statusCode: 201 });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while creating an author", data: newAuthor, statusCode: 400 });
    }
}

//editAuthor
const editAuthor = async (request, response, next) => {
    const { _id } = request.params;

    const { firstName, lastName, birthYear, bio } = request.body;

    const updatedAuthor = {
        firstName: firstName, 
        lastName: lastName, 
        birthYear: birthYear, 
        bio: bio 
    };

    await Author.findByIdAndUpdate({ _id: _id }, updatedAuthor);

    try {
        response.status(200).json({
            success: `The author with id ${_id} is updated successfully`,
            data: updatedAuthor,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while editing an author", statusCode: 400 });
    }
}

//deleteAuthor
const deleteAuthor = async (request, response, next) => {
    const { _id } = request.params;

    await Author.findByIdAndDelete({ _id: _id });

    try {
        response.status(200).json({
            success: `The author with id ${_id} is deleted successfully`,
            statusCode: 200,
          });
    } catch (error) {
        response
        .status(400)
        .json({ error: "Something happened while deleting an author", statusCode: 400 });
    }
}

module.exports = {createBook, editBook, deleteBook, createAuthor, editAuthor, deleteAuthor}; // Add the author handler functions to module.exports