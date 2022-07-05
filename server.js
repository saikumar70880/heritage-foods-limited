require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const authRouter = require("./routes/authRouter");
const itemsRouter = require("./routes/itemsRouter");

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Heritage Foods Limited");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/items", itemsRouter);

const port = process.env.PORT || 3000;

const start = () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
