const keys = require("../keys");
const mongoose =  require("mongoose");
mongoose.connect(`mongodb://${keys.mgHost}:${keys.mgPort}/${keys.mgDatabase}`,{ useNewUrlParser: true, useUnifiedTopology: true })
    .then(()=>{
        console.log("server running")
    })
    .catch(error=>{
        console.log(error)
    })
module.exports = mongoose;