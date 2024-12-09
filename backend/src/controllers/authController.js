import bycrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bycrypt.hash(password, 10);

    const newuser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newuser.save();

    const token = jwt.sign(
      { id: newuser._id, role: newuser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Registration successful",
      User: {
        id: newuser._id,
        name: newuser.name,
        email: newuser.email,
        role: newuser.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error register user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const isMatch = await bycrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      User: {
        id: user._id,
        email: user.email,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("Error login user:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
