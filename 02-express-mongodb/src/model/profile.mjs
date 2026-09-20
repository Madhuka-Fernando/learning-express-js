import { model, Schema, Types } from "mongoose";

//Creating profile Schema
const profileSchema = new Schema(
  {
    img: {
      type: String,
      required: true,
    },
    // create connection with User table
    user: {
      type: Types.ObjectId,
      ref: "User",
      required: true, // every profile must have a user
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

//Creating profile Model
const Profile = model("Profile", profileSchema);

export default Profile;
