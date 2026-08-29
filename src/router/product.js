import { productInfo } from "../data/productInfo.js";

//router the product API endpoints
import { Router } from "express";
const productRouter = Router();

//get product by id(using params)
productRouter.get("/p-id/:id", (req, res) => {
  const { id } = req.params;

  if (id != undefined) {
    const product = productInfo.find((p) => p.id === parseInt(id));
    if (product) {
      res.status(200).json({
        msg: "Product data",
        data: product,
      });
    } else {
      res.status(404).json({
        msg: "Product not found",
      });
    }
  } else {
    res.status(400).json({
      msg: "Invalid product ID",
    });
  }
});

//export the product router
export default productRouter;
``;
