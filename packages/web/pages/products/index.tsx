import Footer from "@/views/common/Footer";
import ProductsPage from "@/views/product/Products";

import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductData } from "@/db/sqlite/db-types";

import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

import { allProducts, searchProducts } from "@/services/gql";

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
    req,
    query,
}: GetServerSidePropsContext) => {
    const client = new ApolloClient({
        ssrMode: true,
        link: createHttpLink({
            uri: `${process.env.NEXT_PUBLIC_NEST_API}/graphql`,
            credentials: "same-origin",
            headers: {
                cookie: req.headers.cookie || "",
            },
        }),
        cache: new InMemoryCache(),
    });

    const products = query.hasOwnProperty("search")
        ? (await searchProducts(client, query?.search as string)).data
              .fetchProductByKeyword
        : (await allProducts(client)).data.fetchProducts;
    return {
        props: {
            products,
        },
    };
};
