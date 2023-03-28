process.env.NODE_ENV = 'test'

const request = require('supertest')
const app = require('./app')
let itemList = require('./fakeDb')

let candy = {'name': 'candy', 'price': 2.45}

beforeEach( () => {
    itemList.push(candy)
})

afterEach( () => {
    itemList.length = 0
})

describe("GET /items", () => {
    test("Gets a list of items", async function() {
      const resp = await request(app).get(`/items`);

      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({'itemList': [{'name': 'candy', 'price': 2.45}]});

    });
});

describe("GET /items/candy", () => {
    test("Gets candy page", async function() {
        const resp = await request(app).get(`/items/candy`);
        
        console.log(resp.body)
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({"item": {"name": "candy", "price": 2.45}});
    });
  });

describe("DELETE /items/:name", () => {
    test("Deletes a single a item", async function() {
        const resp = await request(app).delete(`/items/${candy.name}`);
        expect(resp.statusCode).toBe(200);
        expect(itemList.length).toEqual(0)
        expect(resp.body).toEqual({ message: "Deleted" });
    });
});

describe("POST /items", function() {
    test("Add new item", async function() {
      const resp = await request(app)
        .post(`/items`)
        .send({
          name: "Troll",
          price: 10
        });
      expect(resp.statusCode).toBe(200);
      expect(itemList.length).toEqual(2)
      expect(resp.body).toEqual({'itemList': [{'name': 'candy', 'price': 2.45}, {'name': 'Troll', 'price': 10}]});
    });
})

describe("POST /items/candy", function() {
    test("Update new item", async function() {
      const resp = await request(app)
        .post(`/items/candy`)
        .send({
          name: "Troll",
          price: 10
        });
      expect(resp.statusCode).toBe(200);
      expect(resp.body).toEqual({"newData": {'name': 'Troll', 'price': 10}});
    });
})