import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Header from "@/views/common/Header";
import Footer from "@/views/common/Footer";
import OrdersPage from "@/views/product/Orders";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { useCart } from "@/store/cart/cart.hook";

import Cookies from "js-cookie";

import { authRefresh } from "@/utils/fetching";

import { FormikHelpers } from "formik";
import { FormValues } from "@/views/product/PaymentForm";

import axios from "axios";

type ProductProps = {
    token: string;
    user?: User | null;
};

export default function Orders({ token, user }: ProductProps) {
    const userAuth = useAuthentication();
    const cart = useCart();
    const authToken = userAuth.token;
    const router = useRouter();

    function handleSubmitOrder(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        if (!cart.cartCount) return actions.setSubmitting(false);
        if (!userAuth.user) return actions.setSubmitting(false);
        actions.setSubmitting(true);
        axios
            .post("/api/orders/submit", {
                userId: userAuth.user?.id,
                products: JSON.stringify(cart.cartItems),
            })
            .then((response) => {
                if (response.data) {
                    setTimeout(() => {
                        cart.clearCartItems(cart.cartItems);
                        actions.setSubmitting(false);
                    }, 2000);
                    router.push("/account");
                }
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        if (token !== "" && user) {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "none",
            });
            userAuth.setUser(user);
            userAuth.setToken(token);
        }
    }, [token]);

    return (
        <>
            <OrdersPage handleSubmitOrder={handleSubmitOrder} />
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

    return {
        props: {
            token,
            user,
        },
    };
}
