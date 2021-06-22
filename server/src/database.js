const keys = require("../keys");
const mongoose =  require("mongoose");
mongoose.connect("mongodb://localhost:27017/carshop",{userNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>{
        console.log("server running")
    })
    .catch(error=>{
        console.log(error)
    })
module.exports = mongoose;