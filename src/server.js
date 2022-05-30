const express = require("express");
const pg = require("pg");
const port = process.env.PORT || 8080;
const app = express();
const pool = new pg.Pool();

let counter = 0;

app.get("/data", async (req, res) => {
  try {
    res.json({ data: (await pool.query("SELECT NOW()")).rows });
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
});

app.get("/", async (req, res) => {
  console.log(`Hit #${counter}`);
  counter++;
  res.send(
    `Hello ${process.env.HOSTNAME || "World"}. This app is connected to a container running at ${process.env.PGHOST}:${process.env.PGPORT}`,
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
