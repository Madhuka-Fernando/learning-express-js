import { model, Schema, Types } from "mongoose";
import Category from "./category.mjs";
import Product from "./product.mjs";
import Profile from "./profile.mjs";

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
    products: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  },
);

// create pre middleware function to before deleting user
userSchema.pre("deleteOne", async function () {
  //get user details from quary
  const user = await this.model.findOne(this.getQuery());
  if (user) {
    const products = user.products;
    if (products.length > 0) {
      for (const product of products) {
        //delete selected product from Category
        await Category.updateMany(
          { products: product },
          { $pull: { products: product } },
        );
        //delete the product
        await Product.deleteOne({ _id: product });
      }
    }
    //delete the profile
    await Profile.deleteOne({ user: user._id });
  }
});

//Creating user Model
const User = model("User", userSchema);

export default User;
