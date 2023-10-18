const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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

const ADMIN = mongoose.model("admin" , adminSchema)

module.exports = ADMIN