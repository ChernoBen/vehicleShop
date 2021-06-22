const keys = require("../keys");
const mongoose =  require("mongoose");
mongoose.connection(`mongodb://${keys.mgHost}:${keys.mgPort}/${keys.mgDatabase}`,{userNewUrlParser: true,useUnifiedTopology:true})
    .then(()=>{
        console.log("server running")
    })
    .catch(error=>{
        console.log(error)
    })
module.exports = mongoose;