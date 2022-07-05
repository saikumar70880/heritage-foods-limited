const { poolPromise } = require("../db/connect");
const getAllProducts = async (req, res) => {
  const pool = await poolPromise;
  const result = await pool.request().query(`SELECT * FROM [dbo].[item]`);
  res
    .status(200)
    .json({ data: result.recordsets[0], nbHits: result.recordsets[0].length });
};

const getSingleProduct = async (req, res) => {
  const pool = await poolPromise;
  const result = await pool
    .request()
    .query(`SELECT * FROM [dbo].[item] where item_id=${req.body.item_id}`);
  res
    .status(200)
    .json({ data: result.recordsets[0], nbHits: result.recordsets[0].length });
};

module.exports = { getAllProducts, getSingleProduct };
