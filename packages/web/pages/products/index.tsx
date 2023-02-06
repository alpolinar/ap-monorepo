import Footer from "@/views/common/Footer";
import ProductsPage from "@/views/product/Products";

import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { ProductData } from "@/db/sqlite/db-types";

import Cookies from "js-cookie";

import { authRefresh, fetchProducts, searchProduct } from "@/utils/fetching";

type ProductProps = {
    token: string;
    user?: User | null;
    products: Array<ProductData>;
};

export default function Products({ token, user, products }: ProductProps) {
    const userAuth = useAuthentication();

    useEffect(() => {
        if (token !== "" && user) {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "none",
            });
            userAuth.setUser(user);
        }
    }, [token]);
    return (
        <>
            <ProductsPage products={products} />
            <Footer />
        </>
    );
}

export async function getServerSideProps({
    req,
    query,
}: GetServerSidePropsContext) {
    console.log("Server Side Props");
    const token = req.cookies?.token ?? "";
    const user = token !== "" ? await authRefresh(token) : {};

    const products: Array<ProductData> = query.hasOwnProperty("search")
        ? await searchProduct(query?.search)
        : await fetchProducts();
    return {
        props: {
            token,
            user,
            products,
        },
    };
}
