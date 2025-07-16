const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {   Getbussiness } = require("../controller/bussinessController");
const router = express.Router();


router.get('/getbussiness/:id',authMiddleware,Getbussiness)


module.exports=router 