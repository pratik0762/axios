const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
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

const USER = mongoose.model("user" , userSchema)

module.exports = USER