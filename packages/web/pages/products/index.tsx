import Footer from "@/views/common/Footer";
import ProductsPage from "@/views/product/Products";

import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductData } from "@/db/sqlite/db-types";

import axios from "axios";

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

export async function getServerSideProps({ query }: GetServerSidePropsContext) {
    console.log("Server Side Props");
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
}
