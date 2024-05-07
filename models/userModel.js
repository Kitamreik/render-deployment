const mongoose = require("mongoose")//require mongoose
const passport = require("passport"); //will define in Auth unit
const {Schema} = mongoose //use destructuring to assign the schema to mongoose

//Create a new variable called userSchema and inside of this variable, create a new Schema(). Inside of the Schema argument, create a new object where the structure is similar to the slides for the User model except the values will ONLY mention the data type that property will accept. It will NOT include the id key-value pair.


//Kit Note: You can enable form validation if you wish for the parameters of username/password, but not required. 
const userSchema = new Schema({
    username: {
        type: String
        //required
        //unique
    },
    password: {
        type: String
        //required
    },
    googleId: {
        type: String
        //required
    }
}
)

//Next create a new variable called User and inside of this variable, create a new mongoose model that will take in 2 arguments
const User = mongoose.model("User", userSchema);

module.exports = User;