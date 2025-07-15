const userModel = require("../Models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.RegisterUser = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      age,
      gender,
      email,
      phoneNo,
      password,
      confirmPassword,
      address,
      newsSubscription,
      termsAccepted,
    } = req.body;

    // Validate terms
    if (!termsAccepted) {
      return res.status(400).json({ message: "Terms must be accepted." });
    }

    // Password match check
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match." });
    }

    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered." });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new userModel({
      firstName,
      lastName,
      age,
      gender,
      email,
      phoneNo,
      password: hashedPassword,
      address: {
        line1: address.line1,
        line2: address.line2,
        city: address.city,
        state: address.state,
        country: address.country,
        pincode: address.pincode,
      },
      newsSubscription,
      termsAccepted,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";

    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT
    const payload = {
      userId: user._id,
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
