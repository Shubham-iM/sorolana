const { Client } = require("pg");

const client = new Client({
  // host: "35.154.90.180",
  host: "localhost",
  user: "postgres",
  port: 5432,
  // password: "imentus123",
  password: "123456",

  database: "sorolanadb",
  ssl: {
    rejectUnauthorized: false, // This option might be needed for self-signed certificates
  },
});
const gmpdbclient = new Client({
  // host: "35.154.90.180",
  host: "localhost",
  user: "postgres",
  port: 5432,
  // password: "imentus123",
  password: "123456",
  database: "gmpdb",
});
// gmpdbclient.connect()

//    .then(() => {
//       console.log("Connected to PostgreSQL database");
//    })
//    .catch((err) => {
//       console.error("Error connecting to PostgreSQL database:", err);
//    });

module.exports = gmpdbclient;

//postgresql://postgres:imentus123@43.205.254.49:5432/gmpdb
//postgres://postgres:imentus123@43.205.254.49:5432/gmpdb
// DATABASE_URL=postgresql://postgres:imentus123@43.205.254.49:5432/gmpdb

// const {Client} =  require("pg")

//  const client = new Client({
//    host:"database-1.ceyrwh5vrqgt.ap-south-1.rds.amazonaws.com",
//    // host: "postgres://postgres:iMentus123456@database-1.ceyrwh5vrqgt.ap-south-1.rds.amazonaws.com:5432/database-1",
//     user: "postgres",
//     port: 5432,
//     password: "iMentus123456",
//     database: "database-1"
//  })
//  module.exports = client
