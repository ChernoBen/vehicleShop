module.exports = {
    apiPort:process.env.API_PORT,
    secret:process.env.SECRET,
    mgHost: process.env.HOST,
    mgDatabase: process.env.MONGO_INITDB_DATABASE,
    mgPassword: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
    mgPort: process.env.ME_CONFIG_MONGODB_PORT
};
// module.exports = {
//     apiPort:"3000",
//     secret:"jhkshdkjsdkjh",
//     mgHost: "localhost",
//     mgDatabase: "vehicle",
//     mgPassword: process.env.ME_CONFIG_MONGODB_ADMINPASSWORD,
//     mgPort: "27017"
// };