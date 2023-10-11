const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    firstName : String,
    lastName : String,
    password : String
});

const USER = mongoose.model("signup" , signupSchema)

module.exports = USER