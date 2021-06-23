const jwt = require("jsonwebtoken");
const Sales = require("../models/Sales");
const keys = require("../../keys");
const secret = keys.secret;

class SalesController{
    async create(req,res){
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

    async get(req,res){
        if (req.query == undefined || req.query == ""){
            let result = await Sales.find();
            return res.status(200).json(result);
        }
        let query = {
            vehicleId: req.query.vehicleId,
            seller:req.body.seller,
            _id:req.query._id
        } = req.query;
        for (var [key, value] of Object.entries(query)) {
            if (!req.query[key]) delete query[key];
        }
        let results = await Sales.find({ ...query});
        if (!results) return res.status(404).json([]);
        return res.json(results);
    }
};
module.exports = new SalesController();