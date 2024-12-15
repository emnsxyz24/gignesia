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
    default: "https://ik.imagekit.io/cx4xvlk0i/Profile_avatar_placeholder_large%20(1).png?updatedAt=1733991904698",
    type: String,
  },
  bio: {
    type: String,
  },
  whatsapp_number: {
    type: String,
  },
  portfolio_urls: {
    type:[String],
  },

});

export default mongoose.model("User", UserSchema)
