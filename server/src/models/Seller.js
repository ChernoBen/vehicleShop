const mongoose = require("../database");

const SellerSchema = new mongoose.Schema({
    name:String
});
const Seller = mongoose.model("Seller",SellerSchema);
module.exports = Seller;