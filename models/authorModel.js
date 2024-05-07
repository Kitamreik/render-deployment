const mongoose = require("mongoose");

const { Schema } = mongoose;

//authorSchema
const authorSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "A first name is required, plis"],
        minLength: [1, "Minimum one character, yo"],
    },
    lastName: {
        type: String,
        required: [true, "A last name is required, plis"],
        minLength: [1, "Minimum one character, yo"],
    },
    birthYear: {
        type: Number,
        required: [true, "The birth year is required"],
        minLength: [4, "Enter full year of birth"],
        maxLength: [4, "Enter full year of birth"],
    },
    bio: {
        type: String,
        required: [true, "A bio is required"],
        minLength: [10, "Minimum ten characters...unless you Beyonce lol"],
    }
})

const Author = mongoose.model("Author", authorSchema);

module.exports = Author;