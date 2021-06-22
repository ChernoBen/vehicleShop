const mongoose = require("../database");

const VehicleSchema = new mongoose.Schema({
    model:String,
    brand:String,
    year:String,
    licensePlate:String,
    color:String,
    value:String
});
const Vehicle = mongoose.model("Vehicle",VehicleSchema);
module.exports = Vehicle;