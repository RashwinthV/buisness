const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {   Getbussiness, RegisterBusiness } = require("../controller/bussinessController");
const router = express.Router();


router.get('/getbussiness/:id',authMiddleware,Getbussiness)
router.post('/register/:id',authMiddleware,RegisterBusiness)


module.exports=router 