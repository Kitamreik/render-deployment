const express = require("express");
const router = express.Router();
//move all routes from app.js to here

//set up authorController
const { getAllAuthors, getAuthor, authorSample } = require("../controllers/authorsController");

// authors/sample
router.get("/authors/sample", authorSample);

router.get("/authors", getAllAuthors);

router.get("/authors/:_id", getAuthor);


module.exports = router;