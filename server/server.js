const express = require("express");
const app = express();
const cors = require("cors");
const routes = require("./src/app");
const keys = require("./keys");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger_output.json");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors({
	origin: '*',
	optionsSuccessStatus: 200
}));
const options = {
	customCss: ".swagger-ui .topbar { display: none }",
	customSiteTitle: "CarShop",
	explorer: true
};

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile, options));
app.use(routes);

app.listen(5000,() => {
	console.log("...server running");
});