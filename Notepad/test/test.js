const request = require("supertest");
const server = require("../app.js");
const { mathOperations } = require("../controllers/users.js");

//Individual Function Testing
describe("Calculator tests", () => {
  test("adding 1 + 2 should return 3", () => {
    var result = mathOperations.sum(1, 2);
    expect(result).toBe(3);
  });

  test("subtracting 2 from 10 should return 8", () => {
    var result = mathOperations.diff(10, 2);
    expect(result).toBe(8);
  });

  test("multiplying 2 and 8 should return 16", () => {
    var result = mathOperations.product(2, 8);
    expect(result).toBe(16);
  });
});

//Notepad
describe(" API ", () => {
  //Getting All Notes
  describe("GET /users/getAllNotes", () => {
    it("It should GET all the Notes Information", async () => {
      const response = await request(server).get("/users/getAllNotes");
      expect(response.status).toBe(200);
    });

    it("It should NOT GET all the Notes Information", async () => {
      const response = await request(server).get("/users/getAllNote");
      expect(response.status).toBe(404);
    });
  });

  //Getting Notes by Name
  describe("GET /users/show/:id", () => {
    it("It should GET a note by Name", async () => {
      const taskId = "File 3";
      const response = await request(server).get(`/users/show/${taskId}`);
      expect(response.status).toBe(200);
    });

    it("It should NOT GET a note by Name", async () => {
      const taskId = "File 10";
      const response = await request(server).get(`/users/show/${taskId}`);
      expect(response.status).toBe(404);
      expect(response.text).toEqual("File not Found");
    });
  });

  //Creating a new Note
  describe("POST /users/create", () => {
    it("It should create a new note text file", async () => {
      const notes = {
        name: "File 6",
        note: "This is just a testing",
      };
      const response = await request(server).post("/users/create").send(notes);
      expect(response.status).toBe(201);
      //expect.objectContation(response.body).toBe('array');
      expect.objectContaining({
        UId: expect.any(String),
        name: expect.any(String),
        path: expect.any(String),
      });
    });

    it("It should NOT create a note without contents ", async () => {
      const notes = {};
      const response = await request(server).post("/users/create").send(notes);
      expect(response.status).toBe(400);
      expect(response.text).toBe("Contents cannot be empty!");
    });
  });
});
