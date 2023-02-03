import AppContainer from "@/views/common/AppContainer";
import Typography from "@/components/Typography";
import Header from "@/views/common/Header";
import Footer from "@/views/common/Footer";

import React, { useEffect } from "react";
import { GetServerSidePropsContext } from "next";

import { User } from "@/store/authentication/authentication.model";
import { useAuthentication } from "@/store/authentication/authentication.hook";
import { ProductData } from "@/db/sqlite/db-types";

import { authRefresh } from "@/utils/fetching";
import Cookies from "js-cookie";

type TermsProps = {
    token: string;
    user?: User | null;
};

export default function Terms({ token, user }: TermsProps) {
    const userAuth = useAuthentication();

    useEffect(() => {
        if (token !== "" && user) {
            Cookies.set("token", token, {
                secure: true,
                sameSite: "none",
            });
            userAuth.setUser(user);
        }
    }, []);
    return (
        <>
            <AppContainer>
                <Typography variant="h3">Terms</Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    eos alias sint asperiores nostrum nemo laborum earum error.
                    Voluptas enim commodi expedita repellat nemo debitis
                    veritatis assumenda impedit non quasi aliquam quis in sequi
                    fugiat aut doloremque ad accusantium deserunt,
                    exercitationem dolor dolores reiciendis eos ea. A natus in
                    consequatur.
                </Typography>
                <Typography variant="body1">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Non
                    eos alias sint asperiores nostrum nemo laborum earum error.
                    Voluptas enim commodi expedita repellat nemo debitis
                    veritatis assumenda impedit non quasi aliquam quis in sequi
                    fugiat aut doloremque ad accusantium deserunt,
                    exercitationem dolor dolores reiciendis eos ea. A natus in
                    consequatur.
                </Typography>
            </AppContainer>
            <Footer />
        </>
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
