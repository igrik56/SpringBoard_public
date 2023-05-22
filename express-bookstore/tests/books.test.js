process.env.NODE_ENV = "test"

const request = require("supertest")


const app = require("../app")
const db = require("../db")


// isbn of sample book
let book_isbn


beforeEach(async () => {
  let result = await db.query(`
    INSERT INTO
      books (isbn, amazon_url, author, language, pages, publisher, title, year)
      VALUES(
        '123432122',
        'https://amazon.com/books',
        'Mike',
        'English',
        124,
        'Pearson',
        'English 101',
        2022)
      RETURNING isbn`)

  book_isbn = result.rows[0].isbn
})


describe("POST /books", function () {
  test("Creates a new book", async function () {
    const response = await request(app)
        .post(`/books`)
        .send({
          isbn: '823892342',
          amazon_url: "https://amazon.com/books/testingBook",
          author: "test_author",
          language: "English",
          pages: 1000,
          publisher: "newPublisher",
          title: "English 201",
          year: 2012
        })
    expect(response.statusCode).toBe(201)
    expect(response.body.book).toHaveProperty("isbn")
  })

  test("Prevents creating book without required title", async function () {
    const response = await request(app)
        .post(`/books`)
        .send({year: 2000})
    expect(response.statusCode).toBe(400)
  })
})


describe("GET /books", function () {
  test("List of 1 book", async function () {
    const response = await request(app).get(`/books`)
    const books = response.body.books
    expect(books).toHaveLength(1)
    expect(books[0]).toHaveProperty("isbn")
    expect(books[0]).toHaveProperty("amazon_url")
  })
})


describe("GET /books/:isbn", function () {
  test("Gets a single book", async function () {
    const response = await request(app)
        .get(`/books/${book_isbn}`)
    expect(response.body.book).toHaveProperty("isbn")
    expect(response.body.book.isbn).toBe(book_isbn)
  })

  test("Responds with 404 if can't find book in question", async function () {
    const response = await request(app)
        .get(`/books/999`)
    expect(response.statusCode).toBe(404)
  })
})


describe("PUT /books/:isbn", function () {
  test("Throw error if didn't pass validation", async function () {
    const response = await request(app)
        .put(`/books/${book_isbn}`)
        .send({
          isbn: "32794782",
          testField: "testField",
          amazon_url: "https://amazon.com/books/testingBook",
          author: "test_author",
          language: "English",
          pages: 1000,
          publisher: "newPublisher",
          title: "test title",
          year: 2000
        })
    expect(response.statusCode).toBe(400)
  })

  test("Responds 404 if can't find book", async function () {
    // delete book first
    await request(app)
        .delete(`/books/${book_isbn}`)
    const response = await request(app).delete(`/books/${book_isbn}`)
    expect(response.statusCode).toBe(404)
  })
})

describe("DELETE /books/:id", function () {
  test("Deletes a single a book", async function () {
    const response = await request(app)
        .delete(`/books/${book_isbn}`)
    expect(response.body).toEqual({message: "Book deleted"})
  });
});


afterEach(async function () {
  await db.query("DELETE FROM BOOKS");
});


afterAll(async function () {
  await db.end()
});