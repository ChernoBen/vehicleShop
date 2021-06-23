const mongoose = require("../database");

const SalesSchema = new mongoose.Schema({
    date: String,
    price: String,
    vehicleId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        required: true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller",
        required:true
    },
    commission:String
});