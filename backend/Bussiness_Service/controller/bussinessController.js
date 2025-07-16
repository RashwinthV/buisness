const mongoose = require("mongoose");
const bussinessModel = require("../models/buissnessModel");
const userModel = require("../models/userModel");

exports.Getbussiness = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const userId = new mongoose.Types.ObjectId(id);

    const businesses = await bussinessModel.find({ ownedBy: userId });

    if (!businesses || businesses.length === 0) {
      return res
        .status(404)
        .json({ message: "No businesses found for this user" });
    }

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.RegisterBusiness = async (req, res) => {
  try {
    const {
      businessName,
      businessEmail,
      description,
      addressLine1,
      addressLine2,
      googleMapLink,
      ownerContact,
      officeContact,
      startedOn,
      gstnumber,
      businessCity,
      businessDistrict,
      businessZipCode,
      logo,
    } = req.body;

    const { id } = req.params;

    // ✅ Fetch user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ✅ If user is not an 'owner', update role to 'owner'
    if (user.role !== "owner") {
      user.role = "owner";
      await user.save();
    }

    const ownedBy = id;

    const lastBusiness = await bussinessModel.findOne().sort({ businessId: -1 });
    const newBusinessId = lastBusiness ? lastBusiness.businessId + 1 : 1001;

    const newBusiness = new bussinessModel({
      name: businessName,
      email: businessEmail,
      description,
      addressLine1,
      addressLine2,
      googleMapLink,
      contactNumberOwner: ownerContact,
      contactNumberOffice: officeContact,
      startedOn,
      gstnumber,
      businessCity,
      businessDistrict,
      businessZipCode,
      businessId: newBusinessId,
      bussinessLogo: logo || null,
      ownedBy,
    });

    const saved = await newBusiness.save();

    return res.status(201).json({
      message: "Business registered successfully",
      business: saved,
    });
  } catch (error) {
    console.error("Business registration error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};

exports.GetAllbussiness=async(req,res)=>{
  try {
    const allbusinesses=await bussinessModel.find();
    if(allbusinesses.length===0){
      res.json({message:"No bussiness  found"})
    }
    
    res.json(allbusinesses)
    
  }catch (error) {
    console.error("Business registration error:", error.message);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }

}