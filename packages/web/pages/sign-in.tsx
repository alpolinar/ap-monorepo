import React from "react";
import { useRouter } from "next/router";

import SignInForm from "@/views/account/SignInForm";

import axios from "axios";

import Cookies from "js-cookie";

import { useAuthentication } from "@/store/authentication/authentication.hook";

import { FormikHelpers } from "formik";

interface FormValues {
    email: string;
    password: string;
}

export default function Login() {
    const userAuth = useAuthentication();
    const router = useRouter();

    function handleSubmit(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        actions.setSubmitting(true);
        axios
            .post(
                `${process.env.NEXT_PUBLIC_NEST_API}/auth/login`,
                {
                    username: values.email,
                    password: values.password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { id, name, email, role } = response.data.record;
                Cookies.set("access_token", response.data.access_token);
                Cookies.set("refresh_token", response.data.refresh_token);

                localStorage.setItem(
                    "access_token",
                    response.data.access_token
                );
                localStorage.setItem(
                    "resfresh_token",
                    response.data.resfresh_token
                );

                localStorage.setItem(
                    "refresh_token",
                    response.data.refresh_token
                );
                userAuth.setUser({ id, name, email, role });
                actions.resetForm();
                router.push("/");
                actions.setSubmitting(false);
            })
            .catch((err) => {
                actions.setStatus(err.response.data.message);
                actions.setSubmitting(false);
            });
    }
    return <SignInForm handleSubmit={handleSubmit} />;
}
