const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const VehicleController = require("./controllers/VehicleController");

router.use((req,res,next)=>{
    next();
});

//user
router.post("/user",UserController.create);
router.post("/auth",UserController.auth);
//vehicle
router.post("/vehicle",VehicleController.create);
router.put("/vehicle",VehicleController.update);
module.exports = router;