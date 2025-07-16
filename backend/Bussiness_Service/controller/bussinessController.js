const mongoose = require('mongoose');
const bussinessModel = require('../models/buissnessModel');

exports.Getbussiness = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID not provided" });
    }

    const userId = new mongoose.Types.ObjectId(id); 

    const businesses = await bussinessModel.find({ ownedBy: userId });

    if (!businesses || businesses.length === 0) {
      return res.status(404).json({ message: "No businesses found for this user" });
    }

    res.status(200).json(businesses);
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ message: "Server error" });
  }
};
