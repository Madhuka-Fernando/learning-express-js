import { model, Schema, Types } from "mongoose";
import User from "./user.mjs";

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

// create pre middleware function to before deleting profile
profileSchema.pre("deleteOne", async function () {
  const profile = await this.model.findOne(this.getQuery());
  if (profile) {
    await User.updateOne({ profile: profile._id }, { profile: null });
  }
});

//Creating profile Model
const Profile = model("Profile", profileSchema);

export default Profile;
