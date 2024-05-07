const express = require("express");
const router = express.Router();

const { getAllBooks, getBook, bookSample } = require("../controllers/booksController");

//Code NOT in starter code- Emulate a sample model:
router.get("/books/sample", bookSample);

router.get("/books", getAllBooks);

router.get("/books/:_id", getBook);
//new code must be created before ID parameters or it'll search for the sample, but it will fail because of the dynamic ID as /:sample


module.exports = router;
