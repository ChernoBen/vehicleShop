const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/app");
const keys = require("./keys");

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(routes);

app.listen(3000,()=>{
    console.log("...server running");
});