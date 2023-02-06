import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

import Hero from "@/views/homepage/Hero";
import Footer from "@/views/common/Footer";
import ProductCTA from "@/views/homepage/ProductCTA";
import ProductSmokingHero from "@/views/homepage/ProductSmokingHero";

import { FormikHelpers } from "formik";

import { GetServerSidePropsContext } from "next";

type FormValues = {
    search: string;
};

export default function Home() {
    const router = useRouter();

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

export async function getServerSideProps(context: GetServerSidePropsContext) {
    console.log("Server Side Props");

    return {
        props: {},
    };
}
