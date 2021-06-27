const mongoose = require("../database");
const CanceledSchema = new mongoose.Schema({
    saleId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Sales",
        required:true
    },
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
const Canceled = mongoose.model("Canceled",CanceledSchema);
module.exports = Canceled;