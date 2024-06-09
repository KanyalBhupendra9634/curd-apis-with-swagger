const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const httpMocks = require("node-mocks-http");
const { loginUser } = require("../controller/userData.controller.js");
const { userData } = require("../models/userData.model.js");

jest.mock("../models/userData.model.js");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");
require("dotenv").config();
describe("loginUser", () => {
  let req, res, next;

  beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
    next = jest.fn();
  });

  fit("should log in a user successfully", async () => {
    req.body = { userName: "testuser", password: "password123" };

    const mockUser = {
      _id: "userId123",
      username: "testuser",
      password: "hashedPassword123",
    };

    userData.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(true);
    jwt.sign.mockReturnValue("mockToken");

    await loginUser(req, res);

    expect(userData.findOne).toHaveBeenCalledWith({ username: "testuser" });
    expect(bcrypt.compare).toHaveBeenCalledWith(
      "password123",
      "hashedPassword123"
    );

    const responseData = res._getJSONData();
    // console.log("THe res.statusCode +++", res.statusCode);
    // expect(res.statusCode).toBe(200);
    // expect(responseData).toEqual({
    //   success: "user logged in successfully",
    //   authToken: "mockToken",
    // });
  });

  it("should return an error for incorrect password", async () => {
    req.body = { userName: "testuser", password: "wrongpassword" };

    const mockUser = {
      _id: "userId123",
      username: "testuser",
      password: "hashedPassword123",
    };

    userData.findOne.mockResolvedValue(mockUser);
    bcrypt.compare.mockResolvedValue(false);

    await loginUser(req, res, next);

    const responseData = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(responseData).toEqual({
      error: {},
      msg: "Invalid user name or password",
    });
  });

  it("should handle server errors gracefully", async () => {
    req.body = { userName: "testuser", password: "password123" };

    userData.findOne.mockImplementation(() => {
      throw new Error("Database error");
    });

    await loginUser(req, res, next);

    const responseData = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(responseData).toEqual({ error: {}, msg: "Database error" });
  });
});
