const express = require("express");
const { RegisterUser } = require("../Controller/login&registerController");
const authMiddleware = require("../Middlewares/Authorize");
const router = express.Router();


router.get('/register',RegisterUser)


module.exports=router