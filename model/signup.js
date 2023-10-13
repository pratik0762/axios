const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const signupSchema = new Schema({
    firstname: String,
    lastname: String,
    email: String,
    contact: Number,
    username: {
        type : String,
        unique : true
    },
    password: String,
  });

const USER = mongoose.model("signup" , signupSchema)

module.exports = USER