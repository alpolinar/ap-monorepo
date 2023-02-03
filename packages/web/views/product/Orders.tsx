import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Typography from "@/components/Typography";
import Button from "@/components/Button";
import Loading from "@/components/Loading";

import ProductContainer from "./ProductContainer";
import OrdersCard from "./OrdersCard";

import { useCart } from "@/store/cart/cart.hook";
import { useAuthentication } from "@/store/authentication/authentication.hook";

import PaymentForm, { FormValues } from "./PaymentForm";
import { PaymentProps } from "./PaymentForm";

import * as Yup from "yup";
import { Formik } from "formik";

export default function OrdersPage({ handleSubmitOrder }: PaymentProps) {
    const cart = useCart();
    const userAuth = useAuthentication();

    const cartItems = cart.cartItems;
    const user = userAuth.user;

    const initialFormValues: FormValues = {
        name: "",
        cardNumber: "",
        cvc: "",
        expiryDate: "",
    };

    return (
        <ProductContainer>
            <Formik
                initialValues={initialFormValues}
                onSubmit={handleSubmitOrder}
            >
                {(props) => (
                    <>
                        {props.isSubmitting ? (
                            <Loading
                                type="bubbles"
                                color="#ff3366"
                                height={200}
                                width={200}
                            />
                        ) : (
                            <>
                                {cartItems.length ? (
                                    <>
                                        <Typography variant="h4">
                                            Orders
                                        </Typography>
                                        <Grid container columnSpacing={2}>
                                            <Grid item sm={12} md={6}>
                                                {cartItems.map((item) => (
                                                    <OrdersCard
                                                        key={item.id}
                                                        {...item}
                                                    />
                                                ))}
                                            </Grid>
                                            <Grid item sm={12} md={6}>
                                                <Typography variant="h6">
                                                    Card Details
                                                </Typography>
                                                <Box>
                                                    <PaymentForm {...props} />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Typography variant="h4">
                                            Wow! Such Empty.
                                        </Typography>
                                        <Box
                                            component="img"
                                            src="https://images.unsplash.com/photo-1622450348974-edae201b4593?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
                                            alt="WoW! Such Empty"
                                            width={"100%"}
                                            sx={{ mb: 2 }}
                                        />
                                    </>
                                )}
                            </>
                        )}
                    </>
                )}
            </Formik>
        </ProductContainer>
    );
}
