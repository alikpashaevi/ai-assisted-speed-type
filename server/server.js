import express from "express";
import axios from "axios";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
env.config();

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.get('/users', async (req, res) => {
  try {
    let result = await db.query("SELECT * FROM user_info");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const checkResult = await db.query("SELECT * FROM user_info WHERE username = $1", [username]);

    if (checkResult.rows.length === 0) {
      return res.status(404).send("This username doesn't exist.");
    } else {
      console.log("loginPassword:", password);
      console.log("Hashed password from DB:", checkResult.rows[0].password);
      // Compare the provided password with the hashed password
      
      bcrypt.compare(password, checkResult.rows[0].password, (err, result) => {
        if (err) {
          console.log(err);
          return res.status(500).send("Internal Server Error");
        }
        if (!result) {
          return res.status(401).send("Wrong password. Please try again!");
        } 
      });
      const token = jwt.sign({ id: checkResult.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).send({
        id: checkResult.rows[0].id,
        name: checkResult.rows[0].name,
        accessToken: token,
    });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;
  try {
    const checkResult = await db.query("SELECT * FROM user_info WHERE username = $1", [username]);
    if (checkResult.rows.length > 0) {
      return res.status(409).send("This username already exists.");
    }
    if (password !== confirmPassword) {
      return res.status(400).send("Passwords do not match. Please try again!");
    } else {
      //Password Hashing
      bcrypt.hash(password, saltRounds, async(err, hash) => {
      if(err){
        console.log("error password hashing", err);
      }else {
        await db.query("INSERT INTO user_info (username, password) VALUES ($1, $2)", [username, hash]);
        res.status(201).send("User registered successfully");
    }})
    }
    } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
    }
})

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const result = await db.query("SELECT * FROM user_info WHERE username = $1", [username]);
//       if (result.rows.length === 0) {
//         return done(null, false, { message: "Incorrect username" });
//       }
//       const user = result.rows[0];
//       bcrypt.compare(password, user.password, (err, result) => {
//         if (err) {
//           return done(err);
//         }
//         if (!result) {
//           return done(null, false, { message: "Incorrect password" });
//         }
//         return done(null, user);
//       });
//     } catch (err) {
//       return done(err);
//     }
//   })
// );

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
