import React from "react";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import {
    Button,
    CustomInputComponent,
    Loading,
    Typography,
} from "@ap-monorepo/ui";

import * as Yup from "yup";
import { Formik, FormikHelpers, Form, Field, FormikValues } from "formik";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
});

export interface FormValues {
    email: string;
    password: string;
}

export default function AdminLoginForm({ onSubmit }: FormikValues) {
    const initialFormValues: FormValues = { email: "", password: "" };
    return (
        <Card sx={{ maxWidth: 500 }}>
            <CardContent>
                <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                >
                    Awesome E-comm
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={onSubmit}
                        validationSchema={LoginSchema}
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
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />

                                        <Field
                                            component={CustomInputComponent}
                                            name="password"
                                            type="password"
                                            placeholder="Password"
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />
                                        <Button
                                            sx={{ mb: props.status ? 2 : 0 }}
                                            color="primary"
                                            variant="contained"
                                            type="submit"
                                            fullWidth
                                            disabled={props.isSubmitting}
                                        >
                                            Sign In
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
            </CardContent>
        </Card>
    );
}
