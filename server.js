require("dotenv").config();
const express = require("express");
const sql = require("mssql");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const connectDB = require("./db/connect");
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");

const app = express();

app.get("/", (req, res) => {
  res.send("Heritage Foods Limited");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productsRouter);

const sqlConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
};

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    const pool = await connectDB(sqlConfig);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
    const result = await pool.request()
      .query(`SELECT [dbo].[region].region_name,
[dbo].[item].item_name,
[dbo].[stock_keeping_units].sku_kgs,
[dbo].[pellet_size].pellet_size,
[dbo].[packing].packing,
[dbo].[sold_for].pellet_price,
[dbo].[sold_for].mash_price from
[dbo].[region],
[dbo].[item],
[dbo].[stock_keeping_units],
[dbo].[pellet_size],
[dbo].[packing],
[dbo].[sold_for] where
[dbo].[region].region_id =[dbo].[sold_for].region_id and
[dbo].[item].item_id=[dbo].[sold_for].item_id and
[dbo].[stock_keeping_units].sku_id=[dbo].[sold_for].sku_id and
[dbo].[pellet_size].pellet_size_id=[dbo].[sold_for].pellet_size_id and
[dbo].[packing].packing_id=[dbo].[sold_for].packing_id`);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};

start();
