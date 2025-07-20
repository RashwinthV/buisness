const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {
  RegisterProduct,
  UpdateProduct,
  GetProducts,
} = require("../controller/ProductController");
const Productroute = express.Router();

Productroute.post(
  "/:id/registerProduct/:businessId",
  authMiddleware,
  RegisterProduct
);

Productroute.put(
  "/:id/udateProduct/:businessId",
  authMiddleware,
  UpdateProduct
);

Productroute.get('/:id/getproducts/:businessId',authMiddleware,GetProducts)

module.exports = Productroute;
