import User from "../models/User.js";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user profile", error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, bio, profile_picture, whatsapp_number, portfolio_urls } = req.body;

  try {
    const user = await User.findById(id).select("role");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "client") {
      const updatedUser = await User.findByIdAndUpdate(
        id,
        { name, email, password },
        { new: true }
      );
      await updatedUser.save();
      res.status(200).json(updatedUser);
    } else if (user.role === "freelancer") {
      const updatedUserFreelancer = await User.findByIdAndUpdate(
        id,
        { name, email, password, bio, profile_picture, whatsapp_number, portfolio_urls },
        { new: true }
      );
      await updatedUserFreelancer.save();
      res.status(200).json(updatedUserFreelancer);
    } else {
      return res.status(400).json({ message: "Invalid user role" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};

export const updateProfilPic = async (req, res) => {
  const { id } = req.params;
  const file = req.file;

  try {
    console.log(file,id)
    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    user.profile_picture = `/uploads/${req.file.filename}`;
    await user.save();
    res
      .status(200)
      .json({ message: "Profile picture updated successfully", user });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update profile picture",
      error: error.message,
    });
  }
};
