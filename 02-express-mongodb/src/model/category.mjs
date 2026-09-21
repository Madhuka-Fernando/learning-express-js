import { model, Schema, Types } from "mongoose";

const categorySchema = new Schema(
  {
    title: String,
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

const Category = model("Category", categorySchema);

export default Category;
