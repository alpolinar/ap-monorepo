import React from "react";
import SignUpForm from "@/views/account/SignUpForm";

import axios from "axios";
import { FormikHelpers } from "formik";
import { FormValues } from "@/views/account/SignUpForm";
import { useRouter } from "next/router";
import { UserRole } from "@/db/sqlite/db-types";

interface User {
    username: string;
    email: string;
    password: string;
    name: string;
    role?: string;
}

export default function Register() {
    const router = useRouter();

    function handleSubmit(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        const username = values.email.split("@")[0];

        actions.setSubmitting(true);
        const user: User = {
            username: username,
            email: values.email,
            password: values.password,
            name: `${values.firstName} ${values.lastName}`,
            role: UserRole.CUSTOMER,
        };

        axios
            .post(`/api/users/create-user`, user)
            .then((response) => {
                actions.resetForm();
                router.push("/sign-in");
                actions.setSubmitting(false);
            })
            .catch((err) => {
                actions.setStatus(err.response.data.message);
                actions.setSubmitting(false);
            });
    }

    return <SignUpForm handleSubmit={handleSubmit} />;
}
