import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import {ApolloClient, HttpLink, InMemoryCache} from "@apollo/client";
import {ApolloProvider} from "@apollo/client/react"

// Initialize Apollo Client
const client = new ApolloClient({
    // Cache query results in memory
    cache: new InMemoryCache(),
    // Define GraphQL API endpoint
    link: new HttpLink({
        uri: 'http://localhost:4000/gql-data',
    })
})

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloProvider client={client}>
            <App/>
        </ApolloProvider>
    </StrictMode>,
)
