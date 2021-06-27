const jwt = require("jsonwebtoken");
const Canceled = require("../models/Canceled");
const keys = require("../../keys");
const secret = keys.secret;

class CanceledController{
    async create(req,res){
        if (!req.headers["authorization"]) return res.status(401).json({ message: "Unauthorized ." });
        let token = req.headers["authorization"];
        token = token.split(" ");
        try {
            let decoded = jwt.verify(token[1], secret);
            if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
        } catch (error) {
            return res.status(500).json({ message: "Internal error ." });
        }
        let body = {
            saleId:req.body.saleId,
            vehicleId: req.body.vehicleId,
            seller: req.body.seller,
            price: req.body.price,
            commission: req.body.commission,
            date: Date.now()
        };
        for (var [key, value] of Object.entries(body)) {
            if (!body[key]) return res.status(400).json({message:"Fields can not be blank"});
        }
        if(body){
            try{
                let result = await Canceled({...body});
                if(!result)return res.status(500).json({message:"Internal error ."});
                await result.save();
                return res.status(201).json(result);
            }catch(error){
                return res.status(500).json({message:"Internal error ."})
            }
        }else{
            return res.status(400).json({message:"Fields cant not be blank ."});
        }
    }

    async get(req, res) {
        let query = {
            _id: req.query._id,
            price: req.query.price,
            vehicleId: req.query.vehicleId,
            seller: req.query.seller
        } = req.query;
        for (var [key, value] of Object.entries(query)) {
            if (!req.query[key]) delete query[key];
        }
        if (req.query == undefined || req.query == "") {
            let result = await Canceled.find();
            return res.status(200).json(result);
        }
        let canceled = await Canceled.find({ ...query });
        return res.status(200).json(canceled);
    }
}
module.exports = new CanceledController();
