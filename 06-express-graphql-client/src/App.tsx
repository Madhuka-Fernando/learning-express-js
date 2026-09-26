import {gql} from '@apollo/client'
import {useMutation, useQuery} from "@apollo/client/react";

// GraphQL query to fetch product list
const getProducts = gql`
    query GetProducts {
        getProducts {
            id,
            title,
        }
    }
`
// GraphQL query to fetch product by id
// const getProductById = gql`
//     query GetProductById($id: Int!) {
//         getProductById(id: $id) {
//             id,
//             title,
//             price
//         }
//     }
// `

//GraphQL mutation with required input variables
const createProduct = gql`
    mutation CreateProduct($title: String!,$description:String!, $price: Float!) {
        createProduct(title: $title, description: $description, price: $price) {
            id ,
            title,
        }
    }
`

function App() {
    // Execute query and destructure state and refetch function
    const {data, loading, error, refetch} = useQuery(getProducts)
    console.log(data, loading, error)

    // Initialize mutation function
    const [addProduct] = useMutation(createProduct)

    return (
        <div>
            {/* Trigger manual query refetch */}
            <button onClick={() => refetch({id: 3})}>
                refetch
            </button>
            {/* Execute mutation with variable payload */}
            <button onClick={() => addProduct({
                variables: {
                    title: "Product 5",
                    description: "Product 5",
                    price: 10099,
                }
            })
            }>
                Create Product
            </button>
        </div>

    )
}

export default App
