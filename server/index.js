const express = require("express")
const mongoose = require('mongoose')
const cors = require('cors')
const AppModel = require('./models/Users')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// sudo systemctl start mongod

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://127.0.0.1:27017/app')

require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await AppModel.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);

    // THIS TO CHECK DUPLICATE USERNAME/EMAIL
  } catch (err) {
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue)[0]; // email or username
      if (field === "email") {
        return res.status(400).json({ message: "Email is already in use" });
      } else if (field === "username") {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }
    res.status(500).json({ error: err.message });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await AppModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Success", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// get token to check if nigga has proper token
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await AppModel.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.get("/allusers", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const allUsers = await AppModel.find().select("-password -email").sort({score: -1});
    res.json(allUsers);
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
});

app.put("/addscore", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await AppModel.findById(decoded.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    user.score += 10;
    await user.save()
    const user2 = await AppModel.findById(decoded.id);
    res.json({msg: "nice", score:user2.score})
  } catch (err) {
    res.status(500).json({ message: "Invalid or expired token" });
  }
})

app.listen(3001, () => {
  console.log('nice')
})
