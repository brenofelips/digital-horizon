import request from "supertest";
import app from "../src/server";
import mongoose from "mongoose";
import dotenv from "dotenv"
import User from "../src/models/userModel.js";

dotenv.config()

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe("User Controller", () => {
  const URL_BASE = "/api/users";

  test("email is not format correct - should be return status 400", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/register`)
      .send({
        username: "joshn",
        email: "josk",
        password: "admin1234",
      });

    expect(response.body.error).toBe("Invalid Email");
    expect(response.statusCode).toBe(400);
  });

  test("password is missing from body - should be return status 400", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/register`)
      .send({
        username: "joshn",
        email: "josk@gmail.com",
      });

    const errorMessage = response.body.errors.map((err) => err.message);
    expect(String(errorMessage)).toBe("password is required!");
    expect(response.statusCode).toBe(400);
  });

  test("username is missing from body - should be return status 400", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/register`)
      .send({
        email: "josk@gmail.com",
        password: "admin12345",
      });

    const errorMessage = response.body.errors.map((err) => err.message);
    expect(String(errorMessage)).toBe("username is required!");
    expect(response.statusCode).toBe(400);
  });

  test("create a new user - should be return status 201", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/register`)
      .send({
        username: "joshn",
        email: "josk@gmail.com",
        password: "admin12345",
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.newUser.username).toBe("joshn");
    expect(response.body.newUser.email).toBe("josk@gmail.com");
    expect(response.body.newUser._id).toBeTruthy();
  });

  test("user is missing from body in login - should be return status 400", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/login`)
      .send({
        password: "123456",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("Invalid username or password");
  });

  test("password is missing from body in login - should be return status 400", async () => {
    const response = await request(app)
      .post(`${URL_BASE}/login`)
      .send({
        username: "tiagome",
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body.error).toEqual("Invalid username or password");
  });

  test("login user - should be return the token", async () => {
    await request(app)
      .post(`${URL_BASE}/register`)
      .send({
        username: "joshn",
        email: "josk@gmail.com",
        password: "admin12345",
      });

    const response = await request(app)
      .post(`${URL_BASE}/login`)
      .send({
        email: "josk@gmail.com",
        password: "admin12345"
      });

    expect(response.body.token).toBeTruthy()
    expect(response.statusCode).toEqual(200);
  });
});
