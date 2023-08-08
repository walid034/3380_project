const mongoose = require("mongoose");

// define Schema Class
const Schema = mongoose.Schema;

const specsSchema = new Schema({
    "Engine Type": { type: String, required: true },
    Displacement: { type: String, required: true },
    HP: { type: String, required: true },
    Torque: { type: String, required: true },
    Transmission: { type: String, required: true },
    "Avg.Starting Price": { type: Number, required: true } 
})

const fullSchema = new Schema({
    Make: { type: String, required: true },
    Model: { type: String, required: true },
    Year: { type: Number, required: true },
    image: {type: String, required: false},
    Category: [String],
    specs: specsSchema
});

const carDetails = mongoose.model("cardetail", fullSchema);
module.exports = carDetails;