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
    test("Should prevent empty data entry by user .", () => {
		let user = {
			name: "",
			email: "",
			password: ""
		};
		return request.post("/user")
			.send(user)
			.then(res => {
				expect(res.statusCode).toEqual(400);
			})
			.catch(error => {
				fail(error);
			});
	});

	test("Should prevent a registration of an email or cpf already registered .", () => {
		let time = Date.now();
		let email = `${time}@gmail.com`;
		let user = {
			name: "benjamim",
			email: email,
			password: `${Date.now()}`
		};
		return request.post("/user")
			.send(user)
			.then(res => {
				expect(res.statusCode).toEqual(201);
				expect(res.body.email).toEqual(email);
				return request.post("/user")
					.send(user)
					.then(res => {
						expect(res.statusCode).toEqual(400);
					})
					.catch(error => {
						fail(error);
					});
			})
			.catch(error => {
				fail(error);
			});
	});
    test("Should return a auth token .", () => {
		return request.post("/auth")
			.send({ email: mainUser.email, password: mainUser.password })
			.then(res => {
				expect(res.statusCode).toEqual(200);
				expect(res.body.token).toBeDefined();
			})
			.catch(error => {
				fail(error);
			});
	});

	test("Should prevent an unregistered person to get an auth token.", () => {
		return request.post("/auth")
			.send({ email: "false@email.com", password: mainUser.password })
			.then(res => {
				expect(res.statusCode).toEqual(403);
			})
			.catch(error => {
				fail(error);
			});
	});

	test("Should prevent from entering an incorrect password.", () => {
		return request.post("/auth")
			.send({ email: mainUser.email, password: "wrongPassword" })
			.then(res => {
				expect(res.statusCode).toEqual(403);
			})
			.catch(error => {
				fail(error);
			});
	});

	test("Should update a user with success", () => {
		return request.post("/auth")
			.send({ email: mainUser.email, password: mainUser.password })
			.then(res => {
				authToken = res.body.token
				expect(res.statusCode).toEqual(200);
				expect(res.body.token).toBeDefined();
			}).catch(error => {
				fail(error);
			});
	});
});