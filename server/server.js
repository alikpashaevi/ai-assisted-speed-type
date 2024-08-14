import express from "express";
import axios from "axios";
import pg from "pg";
import env from "dotenv";
import cors from "cors";
import bcrypt from "bcrypt";
import passport from "passport";
import LocalStrategy from "passport-local";
import session from "express-session"; // Import express-session

const app = express();
const port = 3000;
const saltRounds = 10;

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies
env.config();

// Set up express-session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Use a secret key from your .env file
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session expires after 24 hours
    }, // Set to true if using HTTPS
  })
);

app.use(passport.initialize());
app.use(passport.session());

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

app.post("/login", (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "An error occurred during login." });
    }
    if (!user) {
      // If user is not found or password is incorrect
      return res.status(401).json({ message: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to log in the user." });
      }
      // On successful login, redirect to /profile
      return res.status(200).json({ message: "Login successful", redirectUrl: "/profile" });
    });
  })(req, res, next);
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    console.log(`Welcome, ${req.user.username}! This is your profile.`);
  } else {
    console.log("You are not logged in.");
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
      // Password Hashing
      bcrypt.hash(password, saltRounds, async (err, hash) => {
        if (err) {
          console.log("Error password hashing", err);
        } else {
          const result = await db.query("INSERT INTO user_info (username, password) VALUES ($1, $2) RETURNING *", [username, hash]);
          res.status(201).send("User registered successfully");
          const user = result.rows[0];
          req.login(user, (err) => {
            if (err) {
              console.log("Error logging in user", err);
            } else {
              res.redirect("/profile");
            }
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
});

passport.use(
  new LocalStrategy(async function verify(username, password, cb) {
    try {
      const checkResult = await db.query("SELECT * FROM user_info WHERE username = $1", [username]);

      if (checkResult.rows.length === 0) {
        return cb(null, false, { message: "This username does not exist." });
      } else {
        // Compare the provided password with the hashed password
        bcrypt.compare(password, checkResult.rows[0].password, (err, result) => {
          if (err) {
            return cb(err);
          }
          if (!result) {
            return cb(null, false, { message: "Incorrect password." });
          } else {
            return cb(null, checkResult.rows[0]);
          }
        });
      }
    } catch (err) {
      return cb(err);
    }
  })
);

// Serialize and deserialize user info for sessions
passport.serializeUser((user, cb) => {
  cb(null, user.username);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const result = await db.query("SELECT * FROM user_info WHERE id = $1", [id]);
    cb(null, result.rows[0]);
  } catch (err) {
    cb(err);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
