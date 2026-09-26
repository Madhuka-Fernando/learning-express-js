import {products} from "../index.mjs";

// Resolver function for the createProduct mutation
export const createProduct = (_: any, args: any) => {
    console.log(args)
    // Construct new product object
    const newProduct = {
        id: products.length + 1,
        title: args.title,
        description: args.description,
        price: args.price,
    }
    // Append new record to mock database
    products.push(newProduct);
    return newProduct;
}