/** Database setup for BizTime. */
const process = require('process')
const { Client } = require("pg")


let DB_URI;

if (process.env.NODE_ENV === "test") {
  DB_URI = "postgresql:///biztime-test";
} else {
  DB_URI = "postgresql:///biztime";
}

const db = new Client({
    connectionString: DB_URI
  });

db.connect();

module.exports = db;