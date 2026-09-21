import { Router } from "express";
import Category from "../model/category.mjs";
import Product from "../model/product.mjs";

const categoryRouter = Router();

//get all category
categoryRouter.get("/all", async (_, w) => {
  try {
    const allCategory = await Category.find().populate("products", "title");
    return w.status(200).send(allCategory);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//create a category
categoryRouter.post("/create", async (c, w) => {
  const { title } = c.body;
  try {
    const newCategory = await Category.create({
      title,
    });
    return w.status(201).send(newCategory);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//add product to category
categoryRouter.put("/update/:id", async (c, w) => {
  const categoryId = c.params.id;
  const { productId } = c.body;
  //check productId & categoryId are empty
  if (!productId || !categoryId) {
    return w.status(400).send("Bad request");
  }
  try {
    //Other way to update the data
    // await Category.updateOne(
    //   { _id: categoryId },
    //   { $push: { products: productId } },
    // );
    // await Product.updateOne(
    //   { _id: productId },
    //   { $push: { categories: categoryId } },
    // );

    const categoryData = await Category.findById(categoryId); //get category data
    const productData = await Product.findById(productId); //get product data
    categoryData.products.push(productId); //push updated data into category
    productData.categories.push(categoryId); //push updated data into product
    await categoryData.save();
    await productData.save();

    return w.status(200).send("Updated succesfully ...");
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

// delete a product
categoryRouter.delete("/product-delete/:id", async (c, w) => {
  const productId = c.params.id;
  //check productId is empty
  if (!productId) {
    return w.status(400).send("Bad request");
  }
  try {
    // pull the product in Category document
    await Category.updateMany(
      { products: productId },
      { $pull: { products: productId } },
    );
    // update Product document
    await Product.updateOne({ _id: productId }, { categories: [] });

    return w.status(200).send("Deleted succesfully ...");
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

export default categoryRouter;
