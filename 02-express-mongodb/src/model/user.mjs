import { model, Schema } from "mongoose";

//Creating user Schema
const userSchema = Schema(
  {
    name: String,
    userName: {
      type: String,
      unique: true,
      required: true,
    },
    password: String,
    email: String,
  },
  {
    timestamps: true,
  },
);

//Creating user Model
const User = model("User", userSchema);

export default User;
