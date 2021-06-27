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
const mainVehicle = {
    model:`model-${Date.now()}`,
    brand:`brand-${Date.now()}`,
    year:`${Date.now()}`,
    color:`color-${Date.now()}`,
    chassis:`chassis-${Date.now()}`,
    price:`${Date.now()}`,
    licensePlate:`licence-${Date.now()}`
};
const mainSeller = {
    name:`name-${Date.now()}`,
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
        return request.post("/vehicle")
            .set({"authorization":authToken})
            .send(mainVehicle)
            .then(res=>{
                mainVehicle._id = res.body._id;
                expect(res.statusCode).toEqual(201);
                return request.post("/seller")
                    .set({"authorization":authToken})
                    .send(mainSeller)
                    .then(res=>{
                        mainSeller._id = res.body._id;
                        expect(res.statusCode).toEqual(201);                      
                        return request.post("/sales")
                            .set({"authorization":authToken})
                            .send({
                                vehicleId:mainVehicle._id,
                                seller:mainSeller._id,
                                price:"30000",
                                date:Date.now()
                            })
                            .then(res=>{
                                saleId = res.body._id;
                                expect(res.statusCode).toEqual(201);
                            })
                            .catch(error=>{
                                fail(error);
                            });
                    //----//    
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
                vehicleId:mainVehicle._id,
                seller:mainSeller._id,
                price:mainVehicle.price,
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