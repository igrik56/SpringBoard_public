const process = require('process')
process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("../app");
const db = require("../db");


beforeEach(async function() {                   //setup test company.
                                                // Have to drop table every time and re-create it for test because the id will not be the same
    let result = await db.query(`

    INSERT INTO invoices (comp_Code, amt, add_date, paid, paid_date) 
        VALUES ('bok', 100, '2020-02-02', false, null);
        `)
});

afterEach(async function() {                            // clears table
  await db.query("DELETE FROM companies");              // this will also clear invoices since is CASCADE on delete
  });

afterAll(async function() {                     //shut down DB
  await db.end();
});

describe("GET /invoices/", () => {
  test("Gets a list of invoices", async function() {
    const resp = await request(app).get(`/invoices`);

    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({"invoices": [
            {
                "id": 1,
                "comp_code": "bok"
            }]})
  });
});

describe("GET /invoices/1", () => {
  test("Gets invoice 1 page", async function() {
      const resp = await request(app).get(`/invoices/1`);
      
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({"invoice": {"id": 1, "amt": 100, "paid": false, "add_date": "2020-02-02T05:00:00.000Z", "paid_date": null, "company": {"code":"bok","name":"Kolobok","description":"Rolling away"}}})
  })
  
  test('Get non existing invoice page', async () => {
    const resp = await request(app).get(`/invoices/0`)

    expect(resp.statusCode).toBe(404)
    expect(resp.body).toEqual({"error": {"message": "Can't get invoice with 0", "status": 404}, "message": "Can't get invoice with 0"})
  })
  test('Get non existing invoice page', async () => {
    const resp = await request(app).get(`/invoices/kdslkd`)

    expect(resp.statusCode).toBe(500)
    expect(resp.body).toEqual({
        "error": {
            "length": 107,
            "name": "error",
            "severity": "ERROR",
            "code": "22P02",
            "file": "numutils.c",
            "line": "256",
            "routine": "pg_strtoint32"
        },
        "message": "invalid input syntax for type integer: \"kdslkd\""
    })
})
});

describe("DELETE /invoices/1", function() {
  test("DELETE a invoice", async function() {
    const resp = await request(app).delete(`/invoices/1`)
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({status: 'deleted'});
  });
})

// describe("POST /invoices/", function() {
    //   test("Add new item", async function() {
//     const resp = await request(app)
//       .post(`/invoices/`)
//       .send({
//         code: 'trl',
//         name: "Troll",
//         description: "Trolololooo-lolo-lo-lo"
//       });
//     expect(resp.statusCode).toBe(201);
//     // expect(invoices.length).toEqual(2)
//     expect(resp.body).toEqual({"company":[{"code":"trl","name":"Troll","description":"Trolololooo-lolo-lo-lo"}]});
//   });
// })

// describe("PATCH /invoices/1", function() {
//   test("Update new item", async function() {
//     const resp = await request(app)
//       .patch(`/invoices/1`)
//       .send({
//         name: "Troll",
//         description: "more trolololo"
//       });
//     expect(resp.statusCode).toBe(200);
//     expect(resp.body).toEqual({"company": {'code': '1', name: 'Troll', 'description': "more trolololo"}});
//   });
// })