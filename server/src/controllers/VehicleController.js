const jwt = require("jsonwebtoken");
const Vehicle = require("../models/Vehicles");
const keys = require("../../keys");
const secret = keys.secret;

class VehicleController {
    async create(req, res) {
        if (req.headers["authorization"]) {
            const {
                model,
                brand,
                year,
                licensePlate,
                color,
                chassis,
                price
            } = req.body;
            if (!model || !brand || !year || !licensePlate || !color || !chassis || !price) {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            if (model == "" || brand == "" || year == "" || licensePlate == "" || color == "" || chassis == "" || price == "") {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            if (model == undefined || brand == undefined || year == undefined || licensePlate == undefined || color == undefined || chassis == undefined || price == undefined) {
                return res.status(400).json({ message: "Fields can not be blank ." });
            }
            const token = req.headers["authorization"];
            const bearer = token.split(" ");
            const tk = bearer[1];
            if (!tk) return res.status(401).json({ message: "Unauthorized ." });
            try {
                const decoded = jwt.verify(tk, secret);
                if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
                const newVehicle = new Vehicle({
                    model,
                    brand,
                    year,
                    licensePlate,
                    color,
                    chassis,
                    price
                });
                await newVehicle.save();
                return res.status(201).json({ newVehicle });
            } catch (error) {
                return res.status(500).json({ message: "Internal error ." });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized ." })
        }
    }
};
module.exports = new VehicleController();