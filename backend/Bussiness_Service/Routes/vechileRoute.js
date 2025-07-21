const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const { RegisterVechile, GetbussinessVechile } = require("../controller/VechileController");
const Vechileroute = express.Router();

Vechileroute.post(
  "/:id/registervechile/:businessId",
  authMiddleware,
  RegisterVechile
);

// Productroute.put(
//   "/:id/udateProduct/:businessId",
//   authMiddleware,
//   UpdateProduct
// );

Vechileroute.get('/:id/getvehicle/:businessId',authMiddleware,GetbussinessVechile)

module.exports = Vechileroute;
