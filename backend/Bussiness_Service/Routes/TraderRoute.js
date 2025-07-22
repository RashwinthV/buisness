const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const { RegisterTrader } = require("../controller/TradePartyController");
const Traderroute = express.Router();

Traderroute.post(
  "/:id/registervechile/:businessId",
  authMiddleware,
  RegisterTrader
);

// Productroute.put(
//   "/:id/udateProduct/:businessId",
//   authMiddleware,
//   UpdateProduct
// );

// Traderroute.get('/:id/getvehicle/:businessId',authMiddleware,GetbussinessVechile)

module.exports = Traderroute;