const process = require('process')
process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");

let testCompany

beforeEach(async function() {                   //setup test company
    let result = await db.query(`
      INSERT INTO companies 
        VALUES ('bok', 'Kolobok', 'Rolling away')
        RETURNING code, name, description
        `)

        testCompany = result.rows[0]
});

afterEach(async function() {                  // clears table
  await db.query("DELETE FROM companies");
});

afterAll(async function() {                   //turns off db
  await db.end();
});

describe("GET /companies/", () => {
  test("Gets a list of items", async function() {
    const resp = await request(app).get(`/companies`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({"companies":[{"code":"bok","name":"Kolobok","description":"Rolling away"}]});

  });
});

describe("GET /companies/bok", () => {
  test("Gets bok page", async function() {
      const resp = await request(app).get(`/companies/bok`);
      
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({"company":[{"code":"bok","name":"Kolobok","description":"Rolling away"}]})
  })
  test('Get non existing company page', async () => {
    const resp = await request(app).get(`/companies/trl`)

    expect(resp.statusCode).toBe(404)
    expect(resp.body).toEqual({"error": {"message": "Can't get a company with trl", "status": 404}, "message": "Can't get a company with trl"})
  })
});

describe("POST /companies/", function() {
  test("Add new item", async function() {
    const resp = await request(app)
      .post(`/companies/`)
      .send({
        code: 'trl',
        name: "Troll",
        description: "Trolololooo-lolo-lo-lo"
      });
    expect(resp.statusCode).toBe(201);
    // expect(companies.length).toEqual(2)
    expect(resp.body).toEqual({"company":[{"code":"trl","name":"Troll","description":"Trolololooo-lolo-lo-lo"}]});
  });
})

describe("PATCH /companies/bok", function() {
  test("Update new item", async function() {
    const resp = await request(app)
      .patch(`/companies/bok`)
      .send({
        name: "Troll",
        description: "more trolololo"
      });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({"company": {'code': 'bok', name: 'Troll', 'description': "more trolololo"}});
  });
})

describe("DELETE /companies/bok", function() {
  test("DELETE a company", async function() {
    const resp = await request(app)
      .delete(`/companies/bok`)
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({status: 'deleted'});
  });
})