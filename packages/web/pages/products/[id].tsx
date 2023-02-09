import React from "react";
import { GetServerSidePropsContext } from "next";

import Footer from "@/views/common/Footer";
import ProductPage from "@/views/product/Product";

import { ProductData } from "@/db/sqlite/db-types";

import { useCart } from "@/store/cart/cart.hook";

import axios from "axios";

type ProductProps = {
    product: ProductData;
};

export default function Product({ product }: ProductProps) {
    const cart = useCart();
    const cartItems = cart.cartItems;

    function handleAddToCart() {
        cart.addItemToCart(cartItems, product);
    }

    return (
        <>
            <ProductPage product={product} handleAddToCart={handleAddToCart} />
            <Footer />
        </>
    );
}

export async function getServerSideProps({
    req,
    query,
}: GetServerSidePropsContext) {
    console.log("Server Side Props");
    const id: string = query.id as string;
    const response = await axios.get(
        `http://localhost:3001/product/find?id=${id}`
    );
    const product = response.data;

    return {
        props: {
            product,
        },
    };
}
