const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const VehicleController = require("./controllers/VehicleController");
const SellerController = require("./controllers/SellerController");
const SalesController = require("./controllers/SalesController");

router.use((req,res,next)=>{
    next();
});

//user
router.post("/user",UserController.create);
router.post("/auth",UserController.auth);
//vehicle
router.post("/vehicle",VehicleController.create);
router.put("/vehicle",VehicleController.update);
router.get("/vehicle",VehicleController.get);
//seller
router.post("/seller",SellerController.create);
router.put("/seller",SellerController.update);
router.get("/seller",SellerController.get);
//sales
router.post("/sales",SalesController.create);
module.exports = router;