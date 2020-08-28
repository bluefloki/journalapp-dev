const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../database/models").User;
const jwt = require("jsonwebtoken");

//Create User
router.post("/", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });
    res.json(newUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//Get all users
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//Get Single User
router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id);
    res.json(singleUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//Edit User
router.patch("/:id", async (req, res) => {
  try {
    let updatedUser;
    if (req.body.password) {
      const { password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedUser = await User.findByIdAndUpdate(req.params.id, {
        ...req.body,
        password: hashedPassword,
      });
    } else {
      updatedUser = await User.findByIdAndUpdate(req.params.id, req.body);
    }
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});

//User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (await bcrypt.compare(password, user.password)) {
      const accessToken = jwt.sign(
        { id: user.id, encryptionKey: user.encryptionKey },
        process.env.JSON_SECRET_KEY
      );
      res.status(201).json({ accessToken });
    } else {
      res.status(400).json({ message: "Incorrect Password" });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "Cannot Find User" });
  }
});

module.exports = router;
