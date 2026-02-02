process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testIsbn;

beforeEach(async function () {
  await db.query("DELETE FROM books");

  const result = await db.query(
    `INSERT INTO books (isbn, amazon_url, author, language, pages, publisher, title, year)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING isbn`,
    [
      "0691161518",
      "http://a.co/eobPtX2",
      "Matthew Lane",
      "english",
      264,
      "Princeton University Press",
      "Power-Up: Unlocking the Hidden Mathematics in Video Games",
      2017
    ]
  );

  testIsbn = result.rows[0].isbn;
});

afterEach(async function () {
  await db.query("DELETE FROM books");
});

afterAll(async function () {
  await db.end();
});

/** GET /books */

describe("GET /books", function () {
  test("Gets a list of books", async function () {
    const resp = await request(app).get("/books");
    expect(resp.statusCode).toBe(200);
    expect(resp.body.books).toHaveLength(1);
    expect(resp.body.books[0]).toHaveProperty("isbn");
  });
});

/** GET /books/:isbn */

describe("GET /books/:isbn", function () {
  test("Gets a single book", async function () {
    const resp = await request(app).get(`/books/${testIsbn}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.book).toHaveProperty("isbn");
    expect(resp.body.book.isbn).toBe(testIsbn);
  });

  test("Responds 404 for invalid isbn", async function () {
    const resp = await request(app).get(`/books/0`);
    expect(resp.statusCode).toBe(404);
  });
});

/** POST /books */

describe("POST /books", function () {
  test("Creates a new book", async function () {
    const newBook = {
      isbn: "1234567890",
      amazon_url: "http://a.co/new",
      author: "Some Author",
      language: "english",
      pages: 100,
      publisher: "Some Pub",
      title: "New Book",
      year: 2020
    };

    const resp = await request(app).post("/books").send(newBook);
    expect(resp.statusCode).toBe(201);
    expect(resp.body.book).toHaveProperty("isbn");
    expect(resp.body.book.isbn).toBe(newBook.isbn);
  });

  test("Prevents creating book with invalid data", async function () {
    const badBook = { isbn: "bad-isbn" };
    const resp = await request(app).post("/books").send(badBook);
    expect(resp.statusCode).toBe(400);
    expect(resp.body.message).toContain("requires");
  });
});

/** PUT /books/:isbn */

describe("PUT /books/:isbn", function () {
  test("Updates a book", async function () {
    const updateData = {
      amazon_url: "http://a.co/updated",
      author: "Updated Author",
      language: "english",
      pages: 300,
      publisher: "Updated Pub",
      title: "Updated Book",
      year: 2021
    };

    const resp = await request(app).put(`/books/${testIsbn}`).send(updateData);
    expect(resp.statusCode).toBe(200);
    expect(resp.body.book).toHaveProperty("isbn");
    expect(resp.body.book.title).toBe(updateData.title);
  });

  test("Prevents invalid update data", async function () {
    const badUpdate = { author: 1234 };
    const resp = await request(app).put(`/books/${testIsbn}`).send(badUpdate);
    expect(resp.statusCode).toBe(400);
    expect(resp.body.message).toBeTruthy();
  });
});

/** PATCH /books/:isbn */

describe("PATCH /books/:isbn", function () {
  test("Partially updates a book", async function () {
    const resp = await request(app).patch(`/books/${testIsbn}`).send({ title: "Patched Title" });
    expect(resp.statusCode).toBe(200);
    expect(resp.body.book.title).toBe("Patched Title");
  });

  test("Prevents invalid patch data", async function () {
    const resp = await request(app).patch(`/books/${testIsbn}`).send({ pages: "one" });
    expect(resp.statusCode).toBe(400);
  });

  test("Prevents changing isbn", async function () {
    const resp = await request(app).patch(`/books/${testIsbn}`).send({ isbn: "another" });
    expect(resp.statusCode).toBe(400);
  });

  test("Responds 404 for invalid isbn", async function () {
    const resp = await request(app).patch(`/books/0`).send({ title: "Nope" });
    expect(resp.statusCode).toBe(404);
  });
});

/** DELETE /books/:isbn */

describe("DELETE /books/:isbn", function () {
  test("Deletes a book", async function () {
    const resp = await request(app).delete(`/books/${testIsbn}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Book deleted" });

    const getResp = await request(app).get(`/books/${testIsbn}`);
    expect(getResp.statusCode).toBe(404);
  });
});