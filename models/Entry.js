const mongoose = require("mongoose");
const { schema } = require("./User");

const EntrySchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    default: '[{"type":"paragraph","children":[{"text":""}]}]',
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
