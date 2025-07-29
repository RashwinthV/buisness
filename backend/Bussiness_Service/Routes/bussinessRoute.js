const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const {   Getbussiness, RegisterBusiness, GetAllbussiness, UpadateBussiness, SoftDeleteBusiness, getActiveAndInactiveBusinesses, ActivateBusiness } = require("../controller/bussinessController");
const Productroute = require("./ProductRoute");
const Employeeroute=require('./employeeRoutes');
const Vechileroute = require("./vechileRoute");
const Traderroute = require("./TraderRoute");
const { AddCategory } = require("../controller/CategoryController");
const router = express.Router();

//get user's bussiness
router.get('/getbussiness/:id',authMiddleware,Getbussiness)
//get ll bussiness
router.get('/getAllbussiness/:id',authMiddleware,GetAllbussiness)
router.get('/bussinessstatus/:id',authMiddleware,getActiveAndInactiveBusinesses)


router.post('/register/:id',authMiddleware,RegisterBusiness)

router.post('/:id/updatebusiness/:businessId',authMiddleware,UpadateBussiness)
router.delete('/:id/softDeletebusiness/:businessId',authMiddleware,SoftDeleteBusiness)
router.put('/:id/status/:businessId',authMiddleware,ActivateBusiness)

//category
router.put('/:id/tags/:businessId/:type',authMiddleware,AddCategory)




//change routers
router.use('/product',Productroute)
router.use('/employee',Employeeroute)
router.use('/vechile',Vechileroute)
router.use('/trader',Traderroute)


module.exports=router 