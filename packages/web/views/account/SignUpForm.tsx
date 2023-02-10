import * as React from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Footer from "@/views/common/Footer";
import AppForm from "@/views/common/AppForm";
import Grid from "@mui/material/Grid";

import {
    Typography,
    Button,
    Loading,
    CustomInputComponent,
} from "@ap-monorepo/ui";

import * as Yup from "yup";
import { Formik, FormikHelpers, Form, Field } from "formik";

const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name required."),
    lastName: Yup.string().required("Last Name required."),
    email: Yup.string()
        .email("Invalid email")
        .required("Email address required."),
    password: Yup.string().min(8).required("Password is required"),
    confirmPassword: Yup.string().oneOf(
        [Yup.ref("password"), null],
        "Password must match."
    ),
});

export interface FormValues {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

type SignUp = {
    handleSubmit: (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => void;
};

export default function SignUp({ handleSubmit }: SignUp) {
    const router = useRouter();

    const initialFormValues: FormValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    };

    return (
        <>
            <AppForm>
                <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                >
                    Sign Up
                </Typography>
                <Typography variant="body2" align="center">
                    <Link href="/sign-in" underline="always">
                        Already have an account?
                    </Link>
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={handleSubmit}
                        validationSchema={RegisterSchema}
                    >
                        {(props) => (
                            <Form noValidate>
                                {props.isSubmitting ? (
                                    <Loading
                                        type="bubbles"
                                        color="#ff3366"
                                        height={200}
                                        width={200}
                                    />
                                ) : (
                                    <Box>
                                        <Grid
                                            container
                                            direction="row"
                                            spacing={2}
                                        >
                                            <Grid item xs={12} sm={6}>
                                                {props.errors.firstName &&
                                                props.touched.firstName ? (
                                                    <Typography color="secondary">
                                                        {props.errors.firstName}
                                                    </Typography>
                                                ) : null}
                                                <Field
                                                    component={
                                                        CustomInputComponent
                                                    }
                                                    type="text"
                                                    name="firstName"
                                                    placeholder="First Name"
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                {props.errors.lastName &&
                                                props.touched.lastName ? (
                                                    <Typography color="secondary">
                                                        {props.errors.lastName}
                                                    </Typography>
                                                ) : null}
                                                <Field
                                                    component={
                                                        CustomInputComponent
                                                    }
                                                    type="text"
                                                    name="lastName"
                                                    placeholder="Last Name"
                                                />
                                            </Grid>
                                        </Grid>
                                        {props.errors.email &&
                                        props.touched.email ? (
                                            <Typography color="secondary">
                                                {props.errors.email}
                                            </Typography>
                                        ) : null}
                                        <Field
                                            component={CustomInputComponent}
                                            name="email"
                                            type="email"
                                            placeholder="Email"
                                        />
                                        {props.errors.password &&
                                        props.touched.password ? (
                                            <Typography color="secondary">
                                                {props.errors.password}
                                            </Typography>
                                        ) : null}
                                        <Field
                                            component={CustomInputComponent}
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                        />
                                        {props.errors.confirmPassword &&
                                        props.touched.confirmPassword ? (
                                            <Typography color="secondary">
                                                {props.errors.confirmPassword}
                                            </Typography>
                                        ) : null}
                                        <Field
                                            component={CustomInputComponent}
                                            name="confirmPassword"
                                            type="password"
                                            placeholder="Confirm Password"
                                        />
                                        <Button
                                            sx={{ mb: 2 }}
                                            color="secondary"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            disabled={props.isSubmitting}
                                        >
                                            Sign Up
                                        </Button>
                                        {!!props.status && (
                                            <Typography
                                                color="secondary"
                                                sx={{ mb: 2 }}
                                            >
                                                {props.status}
                                            </Typography>
                                        )}
                                    </Box>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Box>
            </AppForm>
            <Footer />
        </>
    );
}
