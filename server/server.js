const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const port = 3001;

mongoose
  .connect(
    "mongodb+srv://Ranjith:Ranjith123@cluster0.mdzkluf.mongodb.net/icare_users?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
  });

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  mobileNumber: String,
});

const User = mongoose.model("User", userSchema);

const secretKey = crypto.randomBytes(32).toString("hex");
app.use(express.json());
app.use(cors());
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        res.status(401).json({ error: "Invalid email or password" });
        return;
      }

      bcrypt.compare(password, user.password, (err, result) => {
        if (err || !result) {
          res.status(401).json({ error: "Invalid email or password" });
          return;
        }

        const token = jwt.sign({ email: user.email }, secretKey);

        res.json({ token });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.post("/api/register", (req, res) => {
  const { email, password, confirmPassword, mobileNumber } = req.body;

  if (password !== confirmPassword) {
    res.status(400).json({ error: "Passwords do not match" });
    return;
  }

  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.status(400).json({ error: "Email already registered" });
        return;
      }

      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        const newUser = new User({
          email,
          password: hashedPassword,
          mobileNumber,
        });

        newUser
          .save()
          .then(() => {
            res.sendStatus(201);
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          });
      });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/api/user-details", authenticateToken, (req, res) => {
  User.find()
    .then((users) => {
      res.json({ users });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    req.user = user;
    next();
  });
}

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
