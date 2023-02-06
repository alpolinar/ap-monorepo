import React from "react";

import Profile from "@/views/account/Profile";
import AppContainer from "@/views/common/AppContainer";

import { GetServerSidePropsContext } from "next";

import Footer from "@/views/common/Footer";

export default function Account() {
    return (
        <>
            <AppContainer>
                <Profile />
            </AppContainer>
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
