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
                return res.status(201).json(newVehicle);
            } catch (error) {
                return res.status(500).json({ message: "Internal error ." });
            }
        } else {
            return res.status(401).json({ message: "Unauthorized ." })
        }
    }

    async update(req, res) {
        if (!req.headers["authorization"]) return res.status(401).json({ message: "Unauthorized ." });
        let token = req.headers["authorization"];
        token = token.split(" ");
        try {
            let decoded = jwt.verify(token[1], secret);
            if (!decoded.id) return res.status(401).json({ message: "Unauthorized ." });
        } catch (error) {
            return res.status(500).json({ message: "Internal error ." })
        }
        let body = {
            model: req.body.model,
            brand: req.body.brand,
            licensePlate: req.body.licensePlate,
            color: req.body.color,
            price: req.body.price
        };
        for (var [key, value] of Object.entries(body)) {
            if (!req.body[key]) delete body[key];
        }
        await Vehicle.findByIdAndUpdate(
            { _id: req.body._id },
            { ...body },
            { new: true },
            (err, vehicle) => {
                if (err) return res.status(500);
                return res.json(vehicle);
            });
    }

    async get(req, res) {
        let query = {
            model: req.query.model,
            color: req.query.color,
            brand: req.query.brand,
            licensePlate: req.query.licensePlate,
            year: req.query.year
        } = req.query;
        for (var [key, value] of Object.entries(query)) {
            if (!req.query[key]) delete query[key];
        }
        if (req.query.model == undefined || req.query.model == "") {
            let result = await Vehicle.find();
            return res.status(200).json(result);
        }
        let vehicle = await Vehicle.find({ ...query });
        return res.status(200).json(vehicle);
    }
};
module.exports = new VehicleController();