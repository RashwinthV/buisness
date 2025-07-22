const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {   Getbussiness, RegisterBusiness, GetAllbussiness, UpadateBussiness } = require("../controller/bussinessController");
const Productroute = require("./ProductRoute");
const Employeeroute=require('./employeeRoutes');
const Vechileroute = require("./vechileRoute");
const Traderroute = require("./TraderRoute");
const router = express.Router();

//get user's bussiness
router.get('/getbussiness/:id',authMiddleware,Getbussiness)
//get ll bussiness
router.get('/getAllbussiness/:id',authMiddleware,GetAllbussiness)

router.post('/register/:id',authMiddleware,RegisterBusiness)

router.post('/:id/updatebusiness/:businessId',authMiddleware,UpadateBussiness)





//change routers
router.use('/product',Productroute)
router.use('/employee',Employeeroute)
router.use('/vechile',Vechileroute)
router.use('/trader',Traderroute)


module.exports=router 