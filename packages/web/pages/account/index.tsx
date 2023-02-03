import React, { useEffect } from "react";

import Profile from "@/views/account/Profile";
import AppContainer from "@/views/common/AppContainer";
import Header from "@/views/common/Header";

import { GetServerSidePropsContext } from "next";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { ProductData } from "@/db/sqlite/db-types";

import Cookies from "js-cookie";

import { authRefresh } from "@/utils/fetching";
import Footer from "@/views/common/Footer";

type AccountProps = {
    token: string;
    user?: User | null;
};

export default function Account({ token, user }: AccountProps) {
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
    const token = req.cookies?.token ?? "";
    const user = token !== "" ? await authRefresh(token) : {};
    return {
        props: {
            token,
            user,
        },
    };
}
