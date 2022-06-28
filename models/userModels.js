import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const UserDisplay = mongoose.model("users", UserSchema);

export default UserDisplay;
