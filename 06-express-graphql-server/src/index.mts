import express, {RequestHandler} from 'express';
import {ApolloServer} from "@apollo/server"
import {expressMiddleware} from '@as-integrations/express5';
import {gql} from "graphql-tag";
import {createProduct} from "./mutation/products.mjs";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// Define mock database records
export const products = [
    {
        id: 1,
        title: "Product 1",
        description: "Product 1",
        price: 500,
    },
    {
        id: 2,
        title: "Product 2",
        description: "Product 2",
        price: 1000,
    }, {
        id: 3,
        title: "Product 3",
        description: "Product 3",
        price: 100,
    },
]

// Define GraphQL schema types and operations
const typeDefs = gql`
    type product{
        id: Int,
        title: String,
        description: String,
        price: Float,
    }
    type Query {
        getProducts: [product],
        getProductById(id:Int!): product,
    }
    type Mutation {
        createProduct(title:String!,description:String!,price:Float!,): product
    }
`
// Implement resolver functions for schema operations
const resolvers = {
    Query: {
        getProducts: () => {
            return products;
        },
        getProductById(_: any, {id}: { id: number }) {
            return products.find(product => product.id === id);
        }
    },
    Mutation: {
        createProduct
    }
}

// Instantiate Apollo Server
const server = new ApolloServer({
    typeDefs,
    resolvers,
})

// Start Apollo Server instance
await server.start();
// Mount Apollo Server as Express middleware on defined endpoint
app.use("/gql-data", expressMiddleware(server) as unknown as RequestHandler)

app.listen(4000, () => {
    console.log("Server running on port 4000");
})