const jwt = require("jsonwebtoken");
const Sales = require("../models/Sales");
const keys = require("../../keys");
const secret = keys.secret;

class SalesController{
    async create(req,res){
        console.log(req.body)
        if (req.headers["authorization"]) {
            const {vehicleId,seller,price,date} = req.body;
            if (!date || !vehicleId || !seller || !price) {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            if (vehicleId == "" || seller == "" || price == "" || date == "") {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            if (vehicleId == undefined || seller == undefined || price == undefined || date == undefined) {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            const token = req.headers["authorization"];
            const bearer = token.split(" ");
            const tk = bearer[1];
            if (!tk) return res.status(401).json({ message: "Unauthorized ." });
            try {
                const decoded = jwt.verify(tk, secret);
                if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
                let commission = (parseInt(price) * 10)/100;
                const newSale = new Sales({vehicleId,seller,price,date,commission});
                await newSale.save();
                return res.status(201).json(newSale);
            } catch (error) {
                return res.status(500).json({ message: "Internal error ." });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized ." });
        }
    }
};
module.exports = new SalesController();