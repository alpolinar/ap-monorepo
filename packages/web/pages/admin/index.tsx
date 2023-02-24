import React from "react";
import { useRouter } from "next/router";

import Grid from "@mui/material/Grid";

import AdminLoginForm, { FormValues } from "@/views/admin/AdminLoginForm";

import { FormikHelpers } from "formik";

import axios, { AxiosError } from "axios";

import { USER_ROLES } from "@ap-monorepo/api/src/utils/constants";

import { useAuthentication } from "@/store/authentication/authentication.hook";

import Cookies from "js-cookie";

export default function Admin() {
    const userAuth = useAuthentication();
    const router = useRouter();

    const handleSubmit = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        try {
            const response = await axios.post(
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
            );
            if (response.data) {
                actions.resetForm();

                const { id, name, email, role } = response.data.record;

                if (role !== USER_ROLES.ADMIN) {
                    actions.setStatus("Account not Authorized!");
                    return;
                }

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

                userAuth.setUser({ id, name, email, role });
                router.push("/admin/dashboard");
            }
        } catch (error) {
            actions.resetForm();
            if (error instanceof AxiosError) {
                actions.setStatus(error.response?.data?.message);
            }
        }
    };
    return (
        <Grid
            container
            sx={{ height: "100vh" }}
            alignItems="center"
            justifyContent="center"
        >
            <Grid item>
                <AdminLoginForm onSubmit={handleSubmit} />
            </Grid>
        </Grid>
    );
}
