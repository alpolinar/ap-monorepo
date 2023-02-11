import Footer from "@/views/common/Footer";
import ProductsPage from "@/views/product/Products";

import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductData } from "@/db/sqlite/db-types";

import axios from "axios";

import { wrapper } from "@/store/store";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

type ProductProps = {
    products: Array<ProductData>;
};

export default function Products({ products }: ProductProps) {
    return (
        <>
            <ProductsPage products={products} />
            <Footer />
        </>
    );
}

export const getServerSideProps = async ({
    query,
}: GetServerSidePropsContext) => {
    const client = new ApolloClient({
        uri: `${process.env.NEXT_PUBLIC_NEST_API}/graphql`,
        cache: new InMemoryCache(),
    });

    const mProd = await client.query({
        query: gql`
            query fetchProducts {
                fetchProducts {
                    id
                    name
                    description
                    price
                }
            }
        `,
    });
    console.log(mProd.data.fetchProducts);
    const baseUrl = `${process.env.NEXT_PUBLIC_NEST_API}/product`;
    const endpoint = query.hasOwnProperty("search")
        ? `/search?keyword=${query?.search}`
        : "";
    const response = await axios.get(baseUrl + endpoint);
    const products = response.data;
    return {
        props: {
            products,
        },
    };
};
