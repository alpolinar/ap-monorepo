import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Header from "@/views/common/Header";
import Hero from "@/views/homepage/Hero";
import Footer from "@/views/common/Footer";
import ProductCTA from "@/views/homepage/ProductCTA";
import ProductSmokingHero from "@/views/homepage/ProductSmokingHero";
import FAppBar from "@/components/figma/AppBar";

import { useAuthentication } from "@/store/authentication/authentication.hook";
import { User } from "@/store/authentication/authentication.model";

import { FormikHelpers } from "formik";

import Cookies from "js-cookie";

import { GetServerSidePropsContext } from "next";
import { authRefresh } from "@/utils/fetching";

type HomeProps = {
    token: string;
    user?: User | null;
};

type FormValues = {
    search: string;
};

export default function Home({ token, user }: HomeProps) {
    const userAuth = useAuthentication();
    const router = useRouter();

    useEffect(() => {
        if (token !== "" && user) {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "none",
            });
            userAuth.setUser(user);
        }
    }, []);

    function handleSubmit(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        actions.setSubmitting(true);
        router.query.search = values.search;
        router.push({
            pathname: "/products",
            query: { search: values.search },
        });
        actions.setSubmitting(false);
    }

    return (
        <React.Fragment>
            <Head>
                <title>Awesome e-Comm</title>
                <meta name="description" content="Some e-comm app." />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Hero handleSubmit={handleSubmit} />
            <ProductCTA />
            <ProductSmokingHero />
            <Footer />
        </React.Fragment>
    );
}

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
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
