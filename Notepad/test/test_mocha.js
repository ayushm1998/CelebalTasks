let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../app.js");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe(" Notepad API ", () => {
  //Getting All Notes
  describe("GET /users/getAllNotes", () => {
    //Getting the names and id of all notes stored in database
    it("It should GET all the Notes Information", (done) => {
      chai
        .request(server)
        .get("/users/getAllNotes")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });
    //If the api didn't hit
    it("It should NOT GET all the Notes Information", (done) => {
      chai
        .request(server)
        .get("/users/getAllNote")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  // Getting Notes by Name
  describe("GET /users.show/:id", () => {
    //Getting the contents of specified notes using name
    it("It should GET a note by Name", (done) => {
      const taskId = "File 3";
      chai
        .request(server)
        .get("/users/show/" + taskId)
        .end((err, response) => {
          response.should.have.status(200);
          // response.body.should.be.a('object');
          done();
        });
    });
    //If the file specified is not available / Not created
    it("It should NOT GET a note by Name", (done) => {
      const taskId = "File 10";
      chai
        .request(server)
        .get("/users/show/" + taskId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq("File not Found");
          done();
        });
    });
  });

  //Creating a new Note
  describe("POST /users/create", () => {
    //Creating a note by giving the req body which is required to create a note
    it("It should create a new note text file", (done) => {
      const notes = {
        name: "File 6",
        note: "This is just a testing",
      };
      chai
        .request(server)
        .post("/users/create")
        .send(notes)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("UId");
          response.body.should.have.property("name").eq("File 6");
          response.body.should.have.property("path");
          done();
        });
    });
    // error if the contents required to create a  note is missing
    it("It should NOT create a note without contents ", (done) => {
      const notes = {};
      chai
        .request(server)
        .post("/users/create")
        .send(notes)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq("Contents cannot be empty!");
          done();
        });
    });
  });
});
