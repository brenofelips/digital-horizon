import request from "supertest";
import jwt from 'jsonwebtoken'
import app from "../src/server";
import mongoose from "mongoose";

import Message from "../src/models/messageModal.js";
import User from "../src/models/userModel.js";

afterAll(async () => {
  await mongoose.disconnect();
});

afterEach(async () => {
  await User.deleteMany({});
  await Message.deleteMany({})
});

let token = "";

beforeAll(() => {
  token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: "1h" },);
})

describe("Message Controller", () => {
  const URL_BASE = "/api/messages";

  test("should be return all messages", async () => {
    const user = await User.create({ username: "josh", email: "josh@gmail.com", password: "123456" })

    await request(app)
      .post(URL_BASE + "/")
      .send({ title: "Basket Game", description: "Ei! We going see a basket game", userId: String(user._id) })
      .set('Authorization', `${token}`);

    const responseWithData = await request(app)
      .get(URL_BASE + "/")
      .set('Authorization', `${token}`);

    expect(responseWithData.statusCode).toBe(200)
    expect(responseWithData.body).toHaveLength(1)
  });

  test("create a new message - shoud be return status 201", async () => {
    const user = await User.create({ username: "josh1", email: "josh1@gmail.com", password: "123456" })

    const response = await request(app)
      .post(URL_BASE + "/")
      .send({ title: "Basket Game", description: "Ei! We going see a basket game", userId: String(user._id) })
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe('Basket Game')
    expect(response.body.description).toBe('Ei! We going see a basket game')
    expect(response.body._id).toBeTruthy()
    expect(response.body.userId).toBeTruthy()
  })

  test("update a message - should be return status 200", async () => {
    const user = await User.create({ username: "josh2", email: "josh2@gmail.com", password: "123456" })

    const response = await request(app)
      .post(URL_BASE + "/")
      .send({ title: "Basket Game", description: "Ei! We going see a basket game", userId: String(user._id) })
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe('Basket Game')
    expect(response.body.description).toBe('Ei! We going see a basket game')

    const responseUpdated = await request(app)
      .put(URL_BASE + "/" + response.body._id)
      .send({ title: "Soccer Player Game", description: "Ei! We going see a soccer game", userId: String(user._id) })
      .set('Authorization', `${token}`);

    const responseWithData = await request(app)
      .get(URL_BASE + "/")
      .set('Authorization', `${token}`);

    responseWithData.body.find(data => {
      expect(responseUpdated.statusCode).toBe(200)
      expect(responseUpdated.body.title).toBe(data.title)
      expect(responseUpdated.body.description).toBe(data.description)
    })
  })

  test("delete a message - should be return status 200", async () => {
    const user = await User.create({ username: "josh2", email: "josh2@gmail.com", password: "123456" })

    const response = await request(app)
      .post(URL_BASE + "/")
      .send({ title: "Basket Game", description: "Ei! We going see a basket game", userId: String(user._id) })
      .set('Authorization', `${token}`);

    expect(response.statusCode).toBe(201)
    expect(response.body.title).toBe('Basket Game')
    expect(response.body.description).toBe('Ei! We going see a basket game')

    const responseWithData = await request(app)
      .get(URL_BASE + "/")
      .set('Authorization', `${token}`);

    expect(responseWithData.statusCode).toBe(200)
    expect(responseWithData.body).toHaveLength(1)

    const messageDeleted = await request(app)
      .delete(URL_BASE + "/" + response.body._id)
      .set('Authorization', `${token}`);

    expect(messageDeleted.statusCode).toBe(200)
    expect(messageDeleted.body.message).toBe("Message successfully deleted")

    const responseWithoutData = await request(app)
      .get(URL_BASE + "/")
      .set('Authorization', `${token}`);

    expect(responseWithoutData.statusCode).toBe(200)
    expect(responseWithoutData.body).toHaveLength(0)
  })
})
