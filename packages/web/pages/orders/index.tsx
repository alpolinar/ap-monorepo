import React from "react";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";

import Footer from "@/views/common/Footer";
import OrdersPage from "@/views/product/Orders";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { useCart } from "@/store/cart/cart.hook";

import { FormikHelpers } from "formik";
import { FormValues } from "@/views/product/PaymentForm";

import axios from "axios";

export default function Orders() {
    const userAuth = useAuthentication();
    const cart = useCart();
    const router = useRouter();

    function handleSubmitOrder(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        if (!cart.cartCount) return actions.setSubmitting(false);
        if (!userAuth.user) return actions.setSubmitting(false);
        actions.setSubmitting(true);
        axios
            .post(`${process.env.NEXT_PUBLIC_NEST_API}/orders/submit`, {
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
    return {
        props: {},
    };
}
