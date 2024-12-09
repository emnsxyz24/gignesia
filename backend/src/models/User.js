import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    enum: ["client", "freelancer"],
    default: "client",
  },
  profile_picture: {
    type: String,
  },
  bio: {
    type: String,
  },
  whatsapp_number: {
    type: String,
  },
});

export default mongoose.model("User", UserSchema);
