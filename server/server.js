import express from "express";
import axios from "axios";
import pg from "pg";
import env from "dotenv";

const app = express();
const port = 3000;
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
})

db.connect();

app.get('/users', async (req, res) => {
  try{
    let result = await db.query("SELECT * FROM user_info");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});