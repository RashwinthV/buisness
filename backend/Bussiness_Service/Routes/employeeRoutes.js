const express = require("express");
const authMiddleware = require("../Middlewares/Authorize");
const { RegisterEmployee, GetEmployee } = require("../controller/EmployeeController");
const Employeeroute = express.Router();
const multer = require("multer");
const upload = multer(); 


Employeeroute.post('/registeremployee/:id',authMiddleware,upload.none(),RegisterEmployee)
Employeeroute.get('/:id/getemployee/:businessId',authMiddleware,GetEmployee)

module.exports = Employeeroute;
