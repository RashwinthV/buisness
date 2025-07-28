const Employee = require("../models/EmployeeModal");
const mongoose = require("mongoose");
const userModel = require("../models/userModel");

// Helper function to calculate age from date of birth
function calculateAge(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }

  return age;
}

exports.RegisterEmployee = async (req, res) => {
  try {
    const {
      name,
      contact,
      fieldOfWork,
      dateOfBirth,
      dateOfJoining,
      salary,
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      country,
      pincode,
      idProof,
      idNumber,
      profilepic,
      businessId,
    } = req.body;

    const imageUrl = profilepic?.imageUrl;
    const publicId = profilepic?.publicId;
    const age = calculateAge(dateOfBirth);

    const latestEmployee = await Employee.findOne().sort({ createdAt: -1 });
    if (!latestEmployee) {
      return res.status(400);
    }

    let nextId = 1;

    if (latestEmployee?.employeeId) {
      const match = latestEmployee.employeeId.match(/EMP(\d+)/);
      if (match) {
        nextId = parseInt(match[1], 10) + 1;
      }
    }

    const formattedId = `EMP${nextId.toString().padStart(3, "0")}`;

    const newEmployee = new Employee({
      employeeId: formattedId,
      name,
      contact,
      fieldOfWork,
      dateOfBirth,
      dateOfJoining,
      Age: age,
      salary,
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      country,
      pincode,
      idProof,
      idNumber,
      profilepic: {
        imageUrl,
        publicId,
      },
      businessId,
    });

    await newEmployee.save();
    res.status(201).json({ success: true, message: "Employee added." });
  } catch (err) {
    console.error("Add employee error:", err);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.GetEmployee = async (req, res) => {
  try {
    const { businessId } = req.params;

    if (!businessId || !mongoose.Types.ObjectId.isValid(businessId)) {
      return res
        .status(400)
        .json({ message: "Invalid or missing business ID" });
    }

    const employee = await Employee.find({ businessId });
    const allemployee = await Employee.find();
    const allusers = await userModel.find();
    const count = allemployee.length + allusers.length;

    if (!Employee || Employee.length === 0) {
      return res
        .status(400)
        .json({ message: "No products found for this business" });
    }
    return res.status(200).json({
      employee,
      totalbussinessEmployee: employee.length,
      allEmployee: count,
    });
  } catch (error) {
    console.error("Product fetching error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.UpdateEmployee = async (req, res) => {
  try {
    const id = req.params.employeeId;

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (err) {
    console.error("Error updating employee:", err);
    res.status(500).json({ error: "Server error while updating employee" });
  }
};
