const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3002, () => {
    console.log("Vehicle tests...");
}));
const mainUser = {
    name: `${Date.now()}`,
    email: `${Date.now()}@hotmail.com`,
    password: `${Date.now()}`
};
let authToken = "";
const mainVehicle = {
    model:`model-${Date.now()}`,
    brand:`brand-${Date.now()}`,
    year:`${Date.now()}`,
    color:`color-${Date.now()}`,
    chassis:`chassis-${Date.now()}`,
    price:`${Date.now()}`,
    licensePlate:`licence-${Date.now()}`
};

beforeAll(() => {
    return request.post("/user")
        .send(mainUser)
        .then(res => {
            return request.post("/auth")
                .send({ email: mainUser.email, password: mainUser.password })
                .then(res => {
                    authToken = res.body.token;
                });
        });
});

describe("Vehicle test suite",()=>{
    test("Should register a new vehicle",()=>{
        return request.post("/vehicle")
            .set({"authorization":authToken})
            .send(mainVehicle)
            .then(res=>{
                mainVehicle._id = res.body._id;
                expect(res.statusCode).toEqual(201);
            })
            .catch(error=>{
                fail(error);
            });
    });

    test("Should update a vehicle",()=>{
        mainVehicle.color = `new-color-${Date.now()}`;
        mainVehicle.price = `new-price-${Date.now()}`;
        return request.put("/vehicle")
            .set({"authorization":authToken})
            .send(mainVehicle)
            .then(res=>{
                expect(res.statusCode).toEqual(200);
            })
            .catch(error=>{
                fail(error);
            });
    });
});
