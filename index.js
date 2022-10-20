const path = require("path");

const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

/*const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "applicationTracker_db",
});*/

const pool = new Pool({
  connectionString:
    "postgres://crwdgwaiieuift:b7a5c092c01fd4c3c1ae529dea8d6b2b1db4fabdeb623611ac8486b545288afc@ec2-35-170-146-54.compute-1.amazonaws.com:5432/ddicpik4f2kefl",
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/addApplication", (req, res) => {
  const company = req.body.company;
  const title = req.body.title;
  const listingURL = req.body.listingURL;
  const salary = req.body.salary;
  const location = req.body.location;

  pool.query(
    "INSERT INTO applications (company,title,listingurl,salary,location) VALUES ($1,$2,$3,$4,$5)",
    [company, title, listingURL, salary, location],
    (err, result) => {
      if (err) {
        console.log("Error:\n" + company);
        console.log(err);
      } else {
        res.send("Values inserted");
      }
    }
  );
});
app.post("/deleteApplication", (req, res) => {
  const jobID = req.body.jobID;
  pool.query(
    "DELETE FROM applications WHERE jobID=($1)",
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
  pool.query(
    "UPDATE applications SET company=($1),title=($2),listingURL=($3),salary=($4),location=($5) WHERE jobID=($6)",
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
  pool.query("SELECT * FROM applications", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server is running on " + PORT);
});
