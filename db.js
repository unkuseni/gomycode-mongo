const mongoose = require("mongoose");

const { Schema } = mongoose;


const contactSchema = new Schema({
  lastName: String,
  firstName: String,
  email: String,
  age: Number,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;