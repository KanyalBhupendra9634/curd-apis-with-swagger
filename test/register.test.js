const mongoose = require("mongoose");
const supertest = require("supertest");
const bcrypt = require("bcrypt");
const { app, connectDB } = require("../index");
const { userData } = require("../models/userData.model");
require("dotenv").config({ path: ".env.test" });

const request = supertest(app);

describe("User Controller - Register User", () => {
  let server;

  beforeAll(async () => {
    await connectDB();
    server = app.listen(8080);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    server.close();
  });

  beforeEach(async () => {
    await userData.deleteMany({});
  });

  test("should register a user successfully", async () => {
    const userPayload = {
      fullName: "Test User",
      username: "test@gmail.com",
      password: "password123",
      about: "I am a test user",
    };

    const response = await request.post("/registerUser").send(userPayload);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty(
      "success",
      "user created successfully"
    );
    expect(response.body.data).toHaveProperty("fullName", "Test User");
    expect(response.body.data).toHaveProperty("username", "test@gmail.com");
    expect(response.body.data).toHaveProperty("about", "I am a test user");
    expect(response.body.data).not.toHaveProperty("password");

    const savedUser = await userData.findOne({ username: "test@gmail.com" });
    expect(savedUser).toBeTruthy();
    expect(savedUser.username).toBe("test@gmail.com");

    const isPasswordValid = await bcrypt.compare(
      userPayload.password,
      savedUser.password
    );
    console.log("THe isPasswordValid is: ", isPasswordValid);
    expect(isPasswordValid).toBe(true);
  });

  test("should handle validation errors", async () => {
    const userPayload = {
      fullName: "Test User",
      username: "testuser",
      // password is missing
      about: "I am a test user",
    };

    const response = await request.post("/registerUser").send(userPayload);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
    expect(response.body).toHaveProperty("message");
  });
});
