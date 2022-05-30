import express from 'express';
import pg from 'pg';
const port = process.env.PORT || 8080;
const app = express();
const pool = new pg.Pool();
import fetch from 'node-fetch';

let counter = 0;


app.get("/data", async (req, res) => {
  try {
    res.json({ data: (await pool.query("SELECT NOW()")).rows });
  } catch (e) {
    console.log(e);
    res.json({ error: e });
  }
});

const RAILWAY_ONE_URL = `http://${process.env.RAILWAY_ONE_SERVICE_HOST}:${process.env.RAILWAY_ONE_SERVICE_PORT}`

app.get("/loopback", async (req, res) => {
   console.log("request received. Starting timeout");
   const controller = new AbortController();
   const timeoutId = setTimeout(() => controller.abort(), 5000)
   let response;
   try {
     response = await fetch(RAILWAY_ONE_URL, { signal: controller.signal });
   } catch (e) {
     if (!controller.signal.aborted) {
       console.log(e);
     }
     res.send(`Could not reach loopback at ${RAILWAY_ONE_URL}`);
     return;
   }
   let data = await response.text();
   res.send(`[v] ${data}`);
});

app.get("/", async (req, res) => {
  console.log(`Hit #${counter}`);
  counter++;
  res.send(
    `Hello ${process.env.HOSTNAME || "World-1"}. This app is connected to a container running at ${process.env.PGHOST}:${process.env.PGPORT}`,
  );
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
