import { model, Schema, Types } from "mongoose";

//Creating user Schema
const userSchema = new Schema(
  {
    name: String,
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    email: String,
    // create connection with Profile table
    profile: {
      type: Types.ObjectId,
      ref: "Profile",
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

//Creating user Model
const User = model("User", userSchema);

export default User;
