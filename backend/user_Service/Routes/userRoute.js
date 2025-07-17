const express = require("express");
const { RegisterUser, Login } = require("../Controller/login&registerController");
const authMiddleware = require("../Middlewares/Authorize");
const { getUser } = require("../Controller/userController");
const router = express.Router();


router.post('/register',RegisterUser)
router.post('/login',Login)
router.get('/getuserdata/:id',authMiddleware,getUser)


module.exports=router 