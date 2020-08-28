if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

//MIDDLEWARE
const express = require("express");
const app = express();
app.use(express.json());

//ROUTES
app.use("/api/entries", require("./routes/entryRouter"));
app.use("/api/users", require("./routes/userRouter"));

//SERVER
const port = process.env.PORT || 5000;
app.listen(port, (req, res) => console.log(`App is running on port: ${port}`));
