import { Router } from "express";
import Product from "../model/product.mjs";
import User from "../model/user.mjs";

const productRouter = Router();

// get all Products
productRouter.get("/all", async (_, w) => {
  try {
    const allProducts = await Product.find();
    return w.status(200).send(allProducts);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//create a new Product
productRouter.post("/create", async (c, w) => {
  const { title, img, user } = c.body;
  try {
    // create new product in Product document
    const newProduct = await Product.create({
      title,
      img,
      user,
    });
    // update products array in User document
    await User.updateOne(
      { _id: user },
      { $push: { products: newProduct._id } },
    );
    return w.status(200).send(newProduct);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//update product
productRouter.put("/update/:productId", async (c, w) => {
  const productId = c.params.productId;
  const { title, img, user } = c.body;
  try {
    //get product data to productData variable
    const productData = await Product.findById(productId);

    // assign updated title & img
    productData.title = title;
    productData.img = img;

    //check user id is already exist or not
    if (user === productData.user) {
      //save the data
      await productData.save();
    }

    //delete old data from user document
    await User.updateOne(
      { _id: productData.user },
      { $pull: { products: productData._id } },
    );
    //update new data to user document
    await User.updateOne(
      { _id: user },
      { $push: { products: productData._id } },
    );

    //assign new user id
    productData.user = user;
    //save the data
    await productData.save();

    return w.status(200).send(productData);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

//delete a product
productRouter.delete("/delete/:productId", async (c, w) => {
  const productId = c.params.productId;
  try {
    const deletedProduct = await Product.findById(productId);
    await User.updateOne(
      { _id: deletedProduct.user },
      { $pull: { products: deletedProduct._id } },
    );
    await deletedProduct.deleteOne();

    return w.status(200).send(`${deletedProduct.title} was deleted ...`);
  } catch (error) {
    console.log(error);
    return w.status(500).send("Internal server error");
  }
});

export default productRouter;
