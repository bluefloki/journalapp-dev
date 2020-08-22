const mongoose = require("mongoose");
const crypto = require("crypto");

const secretKey = crypto.randomBytes(32).toString("hex");

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  encryptionKey: {
    type: String,
    required: true,
    default: secretKey,
  },
  wordsTyped: Number,
  streak: Number,
  achievements: [
    {
      title: String,
      timesAchieved: Number,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
    required: true,
  },
});

module.exports = mongoose.model("User", UserSchema);
