const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3003, () => {
    console.log("Seller tests...");
}));
const mainUser = {
    name: `${Date.now()}`,
    email: `${Date.now()}@hotmail.com`,
    password: `${Date.now()}`
};
let authToken = "";
const mainSeller = {
    name:`name-${Date.now()}`,
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

describe("Seller test suite",()=>{
    test("Should register a new Seller",()=>{
        return request.post("/seller")
            .set({"authorization":authToken})
            .send(mainSeller)
            .then(res=>{
                mainSeller._id = res.body._id;
                expect(res.statusCode).toEqual(201);
            })
            .catch(error=>{
                fail(error);
            });
    });
    test("Should update an seller",()=>{
        mainSeller.name = `new-name-${Date.now()}`;
        return request.put("/seller")
            .set({"authorization":authToken})
            .send({
                id:mainSeller._id,
                name:mainSeller.name
            })
            .then(res=>{
                expect(res.statusCode).toEqual(200);
            })
            .catch(error=>{
                fail(error);
            });
    });

    test("Should list all sellers",()=>{
        return request.get("/seller")
            .query({name:""})
            .then(res=>{
                expect(res.statusCode).toEqual(200);
            })
            .catch(error=>{
                fail(error);
            });
    });

});
