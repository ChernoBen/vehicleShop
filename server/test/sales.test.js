const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3004, () => {
    console.log("Sales tests...");
}));
const mainUser = {
    name: `${Date.now()}`,
    email: `${Date.now()}@hotmail.com`,
    password: `${Date.now()}`
};
let authToken = "";
let vehicle = "";
let seller = "";
let saleId = "";
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

describe("Sales test suite",()=>{
    test("Should create a new sale",()=>{
        return request.get("/vehicle")
            .then(res=>{
                expect(res.statusCode).toEqual(200);
                vehicle = res.body[0];
                return request.get("/seller")
                    .then(res=>{
                        expect(res.statusCode).toEqual(200);
                        seller = res.body[0];
                        return request.post("/sales")
                            .set({"authorization":authToken})
                            .send({
                                vehicleId:vehicle._id,
                                seller:seller._id,
                                price:vehicle.price,
                                date:Date.now()
                            })
                            .then(res=>{
                                saleId = res.body._id;
                                expect(res.statusCode).toEqual(201);
                            })
                            .catch(error=>{
                                fail(error);
                            });
                    })
                    .catch(error=>{
                        fail(error);
                    });
            })
            .catch(error=>{
                fail(error);
            });
    });

    test("Should list all sales",()=>{
        return request.get("/sales")
            .query({
                vehicleId:vehicle._id,
                seller:seller._id,
                price:vehicle.price,
                _id:saleId
            })
            .then(res=>{
                expect(res.statusCode).toEqual(200);
            })
            .catch(error=>{
                fail(error);
            });
    });
});