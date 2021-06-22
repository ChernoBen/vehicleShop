const express = require("express");
const app = express();
const router = require("../src/app");
const supertest = require("supertest");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router);

const request = supertest(app.listen(3001, () => {
	console.log("User tests...");
}));
const mainUser = {
	name: `${Date.now()}`,
	email: `${Date.now()}@hotmail.com`,
	password: `${Date.now()}`
};
let authToken = "";

describe("User test suites",()=>{
    test("Should register a new user with sucess .",()=>{
        return request.post("/user")
            .send(mainUser)
            .then(res=>{
                expect(res.statusCode).toEqual(201);
            })
            .catch(error=>{
                fail(error);
            });
    });
});