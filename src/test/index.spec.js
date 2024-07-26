const app = require("../app");
const request = require("supertest");

describe("/dishes", () => {
  describe("GET /dishes", () => {
    test("It should respond status 200", async () => {
      const response = await request(app).get("/dishes");
      expect(response.statusCode).toBe(200);
    });

    test("It should respond with a json object", async () => {
      const response = await request(app).get("/dishes");
      expect(response.type).toBe("application/json");
    });
  });
});

describe("/user", () => {
  describe("GET /user", () => {
    test("It should respond status 200", async () => {
      const response = await request(app).get("/user");
      expect(response.statusCode).toBe(200);
    });
    test("It should respond with a json object", async () => {
      const response = await request(app).get("/user");
      expect(response.type).toBe("application/json");
    });
  });
});

describe("/login", () => {
  describe("POST /login", () => {
    test("It should respond with a status 500", async () => {
      const response = await request(app).post("/login").send({});
      expect(response.statusCode).toBe(500);
    });
  });
});
