if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//MIDDLEWARE
const express = require("express");
const app = express();
app.use(express.json());

//DATABASE
const mongoose = require("mongoose");
mongoose.connect(process.env.DATABASE_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongoose"));

//ROUTES
app.use("/api/entries", require("./routes/entryRouter"));
app.use("/api/users", require("./routes/userRouter"));

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => console.log(`App is running on port: ${port}`));
