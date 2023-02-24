import { ApolloClient, NormalizedCacheObject, gql } from "@apollo/client";
import { CreateProductInput } from "@/../api/src/graphql";

export const allProducts = async (
    client: ApolloClient<NormalizedCacheObject>
) => {
    return await client.query({
        query: gql`
            query fetchProducts {
                fetchProducts {
                    id
                    name
                    image
                    description
                    price
                    inventory
                }
            }
        `,
    });
};

export const searchProducts = async (
    client: ApolloClient<NormalizedCacheObject>,
    keyword: string
) => {
    return await client.query({
        query: gql`
            query fetchProductByKeyword($name: String!) {
                fetchProductByKeyword(name: $name) {
                    id
                    name
                    image
                    description
                    price
                    inventory
                }
            }
        `,
        variables: {
            name: keyword,
        },
    });
};

export const allOrders = async (
    client: ApolloClient<NormalizedCacheObject>
) => {
    return await client.query({
        query: gql`
            query fetchOrders {
                fetchOrders {
                    id
                    userId
                    products
                }
            }
        `,
    });
};
