const userModel = require("../Models/userModel");
const bcrypt=require('bcryptjs')


exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.json({ message: "user not Found!" });
    }
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.json({ message: "User Not Found" });
    }
    res.json(user);
  } catch (error) {
    res.json({ message: "Internal Server error" });
  }
};

exports.UpdateUser = async (req, res) => {
    try {
    const { id } = req.params; // User ID from route

    // Destructure and sanitize incoming fields
    const {
      firstName,
      lastName,
      email,
      phoneNo,
      age,
      gender,
      profilepic,
      address,
    } = req.body;

    // Create update object
    const updateFields = {
      firstName,
      lastName,
      email,
      phoneNo,
      age,
      gender,
      profilepic,
      address,
    };

    const updatedUser = await userModel.findByIdAndUpdate(id, updateFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.VerifyPassword = async (req, res) => {
    const { id } = req.params;
  const { password: currentPassword } = req.body; 
  try {
    const user = await userModel.findById(id);
    if (!user || !user.password) {
      return res.status(404).json({ success: false, message: 'User not found or no password set' });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }

    return res.status(200).json({ success: true, message: 'Password verified' });
  } catch (error) {
    console.error('Password verification error:', error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.UpdatePassword = async (req, res) => {
     try {
    const { id } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }

    const user = await userModel.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Password update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
