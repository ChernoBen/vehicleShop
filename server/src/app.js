const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
const VehicleController = require("./controllers/VehicleController");
const SellerController = require("./controllers/SellerController");
const SalesController = require("./controllers/SalesController");
const CanceledController = require("./controllers/CanceledController");
router.use((req,res,next)=>{
    next();
});

//user
router.post("/user",UserController.create);
router.post("/auth",UserController.auth);
router.post("/validate",UserController.verify);
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
router.get("/sales",SalesController.get);
//canceled
router.post("/cancel",CanceledController.create);
router.get("/cancel",CanceledController.get);
module.exports = router;