import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

import Header from "@/views/common/Header";
import Footer from "@/views/common/Footer";
import ProductPage from "@/views/product/Product";

import { ProductData } from "@/db/sqlite/db-types";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { useCart } from "@/store/cart/cart.hook";

import { authRefresh, getProduct } from "@/utils/fetching";

import Cookies from "js-cookie";

type ProductProps = {
    token: string;
    user?: User | null;
    product: ProductData;
    referer?: string;
};

export default function Product({ token, user, product }: ProductProps) {
    const userAuth = useAuthentication();
    const cart = useCart();
    const cartItems = cart.cartItems;

    useEffect(() => {
        if (token !== "" && user) {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "none",
            });
            userAuth.setUser(user);
        }
    }, [token]);

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
    const token = req.cookies?.token ?? "";
    const user = token !== "" ? await authRefresh(token) : {};
    const product: ProductData = await getProduct(id);
    return {
        props: {
            token,
            user,
            product,
        },
    };
}
