const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  // Name
  name: {
    type: String,
    required: true,
  },

  // Contact
  contact: {
    type: String,
    required: true,
  },

  // Field of Work
  fieldOfWork: {
    type: String,
    required: true,
  },

  // Date of Birth
  dateOfBirth: {
    type: Date,
    required: true,
  },

  // Date of Joining
  dateOfJoining: {
    type: Date,
    required: true,
  },

  // Salary
  salary: {
    type: Number,
    required: true,
  },

  // Address Line 1
  addressLine1: {
    type: String,
    required: true,
  },

  // Address Line 2 (Optional)
  addressLine2: {
    type: String,
    default: "",
  },

  // City
  city: {
    type: String,
    required: true,
  },

  // District
  district: {
    type: String,
    required: true,
  },

  // Pincode
  pincode: {
    type: String,
    required: true,
  },

  // ID Proof (e.g., Aadhar, PAN)
  idProof: {
    type: String,
    required: true,
  },

  // ID Number
  idNumber: {
    type: String,
    required: true,
  },

  // Profile Picture (Optional)
  profilepic: {
    imageUrl: { type: String, default: null },
    publicId: { type: String, default: null },
  },

  // Business ID
  businessId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },

  // Created On
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("employee", EmployeeSchema);
