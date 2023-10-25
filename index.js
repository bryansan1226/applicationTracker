const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

app.use(cors());
app.use(express.json());

const { Client } = require("pg");

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

//db.connect();
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
  } else {
    console.log("Connected to the database");
  }
});
/*const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "applicationTracker_db",
});*/

app.post("/addApplication", (req, res) => {
  const company = req.body.company;
  const title = req.body.title;
  const listingURL = req.body.listingURL;
  const salary = req.body.salary;
  const location = req.body.location;

  db.query(
    'INSERT INTO applications (company,title,"listingURL",salary,location) VALUES ($1,$2,$3,$4,$5)',
    [company, title, listingURL, salary, location],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});
app.post("/deleteApplication", (req, res) => {
  const jobID = req.body.jobID;
  db.query(
    'DELETE FROM applications WHERE "jobID"=($1)',
    [jobID],
    (err, result) => {
      if (err) {
        console.log("this is the error \n" + err);
      } else {
        res.send("Entry ID " + jobID + " deleted");
      }
    }
  );
});
app.post("/editApplication", (req, res) => {
  const jobID = req.body.jobID;
  const company = req.body.company;
  const title = req.body.title;
  const listingURL = req.body.listingURL;
  const salary = req.body.salary;
  const location = req.body.location;
  db.query(
    'UPDATE applications SET company=($1),title=($2),"listingURL"=($3),salary=($4),location=($5) WHERE "jobID"=($6)',
    [company, title, listingURL, salary, location, jobID],
    (err, result) => {
      if (err) {
        console.log("this is the error \n" + err);
      } else {
        res.send("Entry ID " + jobID + " edited");
      }
    }
  );
});

app.get("/applications", (req, res) => {
  db.query("SELECT * FROM applications", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.use(express.static(path.join(__dirname, "client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build", "index.html"));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
