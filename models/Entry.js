const mongoose = require("mongoose");

const EntrySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  words: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date(),
    required: true,
  },
  updatedAt: {
    type: Date,
    default: Date(),
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("Entry", EntrySchema);
