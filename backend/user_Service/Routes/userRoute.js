const express = require("express");
const { RegisterUser, Login } = require("../Controller/login&registerController");
const authMiddleware = require("../Middlewares/Authorize");
const { getUser, VerifyPassword, UpdatePassword, UpdateUser } = require("../Controller/userController");
const router = express.Router();


router.post('/register',RegisterUser)
router.post('/login',Login)

router.get('/getuserdata/:id',authMiddleware,getUser)
router.post('/updateuser/:id',authMiddleware,UpdateUser)

//password
router.post('/verify-password/:id',authMiddleware,VerifyPassword)
router.put('/change-password/:id',authMiddleware,UpdatePassword)


module.exports=router 