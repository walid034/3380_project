const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const todoSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("user", todoSchema);
module.exports = User;