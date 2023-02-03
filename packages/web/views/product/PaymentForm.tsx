import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Typography, Button, CustomInputComponent } from "@ap-monorepo/ui";

import { FormikHelpers, Form, Field, FormikProps } from "formik";

export type FormValues = {
    name: string;
    cardNumber: string;
    cvc: string;
    expiryDate: string;
};

export type PaymentProps = {
    handleSubmitOrder: (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => void;
};

export default function PaymentForm(props: FormikProps<FormValues>) {
    return (
        <>
            <Form noValidate>
                <Box>
                    {props.errors.name && props.touched.name ? (
                        <Typography color="secondary">
                            {props.errors.name}
                        </Typography>
                    ) : null}
                    <Field
                        component={CustomInputComponent}
                        name="name"
                        type="text"
                        placeholder="Name"
                    />

                    <Field
                        component={CustomInputComponent}
                        name="cardNumber"
                        type="text"
                        placeholder="Card Number"
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Field
                                component={CustomInputComponent}
                                name="cvc"
                                type="text"
                                placeholder="CVC"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Field
                                component={CustomInputComponent}
                                name="expiryDate"
                                type="text"
                                placeholder="mm/yy"
                            />
                        </Grid>
                    </Grid>

                    <Button
                        sx={{ mb: 2 }}
                        color="secondary"
                        variant="contained"
                        type="submit"
                        fullWidth
                    >
                        Submit Order
                    </Button>
                    {!!props.status && (
                        <Typography color="secondary" sx={{ mb: 2 }}>
                            {props.status}
                        </Typography>
                    )}
                </Box>
            </Form>
        </>
    );
}
