const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {   Getbussiness, RegisterBusiness, GetAllbussiness, UpadateBussiness } = require("../controller/bussinessController");
const router = express.Router();

//get user's bussiness
router.get('/getbussiness/:id',authMiddleware,Getbussiness)
//get ll bussiness
router.get('/getAllbussiness/:id',authMiddleware,GetAllbussiness)

router.post('/register/:id',authMiddleware,RegisterBusiness)

router.post('/:id/updatebusiness/:businessId',authMiddleware,UpadateBussiness)


module.exports=router 