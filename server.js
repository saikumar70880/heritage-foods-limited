require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");

const app = express();

app.get("/", (req, res) => {
  res.send("Heritage Foods Limited");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

const port = process.env.PORT || 3000;

const start = () => {
  app.listen(port, () => console.log(`Server is listening on port ${port}...`));
};

start();
