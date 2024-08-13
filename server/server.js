import express from "express";
import axios from "axios";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import session from "express-session";
import passport from "passport";
import { Strategy } from "passport-local";
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const saltRounds = 10;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(express.static(path.join(__dirname, 'build')));
env.config();


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}

const db = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

db.connect();

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/users', async (req, res) => {
  try {
    let result = await db.query("SELECT * FROM user_info");
    res.json(result.rows);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/profile',ensureAuthenticated, (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.redirect('/login');
  }
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/profile",
  failureRedirect: "/login",
  failureFlash: true,
}));


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

passport.use(new Strategy(async function verify(username, password, cb) {
  console.log("username", username);

  try {
    const checkResult = await db.query("SELECT * FROM user_info WHERE username = $1", [username]);
    const user = checkResult.rows[0];
    const storedHashedPassword = user.password;
    if (checkResult.rows.length === 0) {
      return res.status(404).send("This username doesn't exist.");
    } else {
      console.log("loginPassword:", password);
      console.log("Hashed password from DB:", storedHashedPassword);
      // Compare the provided password with the hashed password
      
      bcrypt.compare(password, storedHashedPassword, (err, result) => {
        if (err) {
          return cb(err);
        }
        if (!result) {
          return cb(null, false, { message: 'Incorrect password.' });
        } else {
          return cb(null, checkResult.rows[0]);
        }
      });
    }
  } catch (err) {
    return cb('user not found')
  }
}));

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => {
    return cb(null, user);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
