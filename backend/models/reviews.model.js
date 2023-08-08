const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

// Create a Schema object
const todoSchema = new Schema({
    username: { type: String, required: true },
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: Number, required: true },
    engine: { type: Number, required: true },
    chassis: { type: Number, required: true },
    aesthetics: { type: Number, required: true },
    comfort: { type: Number, required: true },
    "fuel efficiency" :{ type: Number, required: true },
    reliability: { type: Number, required: true },
    overall: { type: Number, required: true },
    comment: { type: String, required: true }
});

const Review = mongoose.model("review", todoSchema);
module.exports = Review;