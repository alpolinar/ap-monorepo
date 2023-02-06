import Footer from "@/views/common/Footer";
import ProductsPage from "@/views/product/Products";

import React from "react";
import { GetServerSidePropsContext } from "next";

import { ProductData } from "@/db/sqlite/db-types";

import { fetchProducts, searchProduct } from "@/utils/fetching";

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

    const products: Array<ProductData> = query.hasOwnProperty("search")
        ? await searchProduct(query?.search)
        : await fetchProducts();
    return {
        props: {
            products,
        },
    };
}
