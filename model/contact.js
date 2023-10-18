const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const contactSchema = new Schema({
    firstname : String,
    lastname : String,
    contact : String,
    state : String,
    district : String,
    userid : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup"
    }
  });

const DATA = mongoose.model("contact" , contactSchema)

module.exports = DATA