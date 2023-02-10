import React, { useEffect, useState } from "react";

import Profile from "@/views/account/Profile";
import AppContainer from "@/views/common/AppContainer";

import { GetServerSidePropsContext } from "next";

import Footer from "@/views/common/Footer";

import api from "@/services/api";
import { Loading } from "@/../ui/src/components/Loading";

import { useAuthentication } from "@/store/authentication/authentication.hook";
import { User } from "@/store/authentication/authentication.model";

import axios from "axios";

export default function Account() {
    const [loading, setLoading] = useState<boolean>(true);
    const userAuth = useAuthentication();

    useEffect(() => {
        const loadUserAccount = async () => {
            let response = await api.get(
                `${process.env.NEXT_PUBLIC_NEST_API}/user/account`
            );
            if (response.hasOwnProperty("access_token")) {
                response = await axios.get(
                    `${process.env.NEXT_PUBLIC_NEST_API}/user/account`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "access_token"
                            )}`,
                        },
                    }
                );
            }

            setLoading(false);
            userAuth.setUser(response.data);
        };
        loadUserAccount();
    }, []);

    return (
        <>
            <AppContainer>
                {loading ? (
                    <Loading
                        type="bubbles"
                        color="#ff3366"
                        height={200}
                        width={200}
                    />
                ) : (
                    <Profile />
                )}
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
