const jwt = require("jsonwebtoken");
const Seller = require("../models/Seller");
const keys = require("../../keys");
const secret = keys.secret;

class SellerController {
    async create(req, res) {
        if (req.headers["authorization"]) {
            const name = req.body.name;
            if (!name) {
                return res.status(400).json({ message: "Field name can not be blank ." });
            }
            if (name == "") {
                return res.status(400).json({ message: "Field name can not be blank ." });
            }
            if (name == undefined) {
                return res.status(400).json({ message: "Field name can not be blank ." });
            }
            const token = req.headers["authorization"];
            const bearer = token.split(" ");
            const tk = bearer[1];
            if (!tk) return res.status(401).json({ message: "Unauthorized ." });
            try {
                const decoded = jwt.verify(tk, secret);
                if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
                const newSeller = new Seller({name});
                await newSeller.save();
                return res.status(201).json(newSeller);
            } catch (error) {
                return res.status(500).json({ message: "Internal error ." });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized ." });
        }
    }

    async update(req,res){
        if (!req.headers["authorization"]) return res.status(401).json({ message: "Unauthorized ." });
        let token = req.headers["authorization"];
        token = token.split(" ");
        try {
            let decoded = jwt.verify(token[1], secret);
            if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
        } catch (error) {
            return res.status(500).json({ message: "internal error ." });
        }
        let body = {
            name: req.body.name
        };
        for (var [chave, valor] of Object.entries(body)) { if (!req.body[chave]) { delete body[chave] } }
        await Seller.findByIdAndUpdate(
            { _id: req.body.id},
            { ...body },
            { new: true },
            (err, seller) => {
                if (err) return res.status(500).json({ message: "Internal error ." });
                return res.json({
                    id:seller._id,
                    name: seller.name,
                });
            });
    }
};
module.exports = new SellerController();