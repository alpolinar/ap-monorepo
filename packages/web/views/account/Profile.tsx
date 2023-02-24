import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Card from "@mui/material/Card";

import FButton from "@/components/figma/Button";

import { Typography, Loading, CustomInputComponent } from "@ap-monorepo/ui";

import { useAuthentication } from "@/store/authentication/authentication.hook";
import axios from "axios";

import * as Yup from "yup";
import { Formik, FormikHelpers, Form, Field, FormikProps } from "formik";
import { Product, Order } from "@ap-monorepo/api/src/graphql";

const EditUserSchema = Yup.object().shape({
    name: Yup.string().min(2).required(),
    email: Yup.string()
        .email("Invalid email")
        .required("This field is required."),
});

type FormValues = {
    id: string;
    name: string;
    email: string;
};

export default function Profile() {
    const userAuth = useAuthentication();
    const user = userAuth.user;

    const [open, setOpen] = useState<boolean>(false);
    const [userOrders, setUserOrders] = useState<Omit<Order, "userId">[]>();

    const initialValues = {
        id: user?.id || "",
        name: user?.name || "",
        email: user?.email || "",
    };

    useEffect(() => {
        if (!user) return () => {};
        axios
            .get(`${process.env.NEXT_PUBLIC_NEST_API}/orders?id=${user?.id}`)
            .then((response) => {
                setUserOrders(response.data);
            })
            .catch((error) => console.log(error));
    }, []);

    function handleOpenEditForm() {
        setOpen(true);
    }

    function handleCloseEditForm() {
        setOpen(false);
    }

    function handleSubmitEditForm(
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) {
        actions.setSubmitting(true);
        const { id, name, email } = values;
        userAuth.setUserUpdate({ id, name, email, role: user?.role || "" });
        actions.setSubmitting(false);
        setOpen(false);
    }

    return (
        <Box>
            <Grid container direction="column">
                <Grid item>
                    <Grid
                        container
                        direction="row"
                        justifyContent="space-between"
                    >
                        <Grid item>
                            <Typography variant="h4">Acount Details</Typography>
                        </Grid>
                        <Grid item>
                            <FButton
                                variant="contained"
                                size="small"
                                onClick={handleOpenEditForm}
                            >
                                Edit
                            </FButton>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Divider />
                </Grid>
                <Divider />
                <Grid item>
                    <Grid container direction="row" justifyItems="center">
                        <Grid item xs={12} sm={6}>
                            <Grid container spacing={1}>
                                <Grid item>
                                    <Typography variant="h6">Name:</Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h6">
                                        {user?.name}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Grid container>
                                <Grid container spacing={1}>
                                    <Grid item>
                                        <Typography variant="h6">
                                            Email:
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="h6">
                                            {user?.email}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            {userOrders &&
                userOrders?.map((order, oIdx) => (
                    <Box key={oIdx}>
                        <Typography>Order ID: {order.id}</Typography>
                        <Grid container direction="row" spacing={2}>
                            {JSON.parse(order.products)?.map(
                                (item: Product) => (
                                    <Grid item key={item.id} xs={12} sm={6}>
                                        <Card
                                            sx={{
                                                display: "flex",
                                                mb: 1,
                                            }}
                                        >
                                            <CardMedia
                                                component="img"
                                                sx={{
                                                    width: 200,
                                                    maxHeight: 140,
                                                }}
                                                image={item.image}
                                                alt={item.name}
                                            />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    width: "100%",
                                                }}
                                            >
                                                <CardContent
                                                    sx={{
                                                        flex: "1 0 auto",
                                                    }}
                                                >
                                                    <Typography
                                                        component="p"
                                                        variant="h6"
                                                        sx={{ mb: 1 }}
                                                    >
                                                        {item.name}
                                                    </Typography>
                                                    <Grid
                                                        container
                                                        justifyItems="center"
                                                        sx={{ mb: 1 }}
                                                    >
                                                        <Grid
                                                            item
                                                            xs={12}
                                                            sm={6}
                                                        >
                                                            <Typography
                                                                variant="body1"
                                                                color="text.secondary"
                                                                component="div"
                                                            >
                                                                $
                                                                {parseFloat(
                                                                    `${item.price}`
                                                                ).toFixed(2)}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Box>
                                        </Card>
                                    </Grid>
                                )
                            )}
                        </Grid>
                    </Box>
                ))}
            <Dialog open={open} onClose={handleCloseEditForm} fullWidth>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmitEditForm}
                        validationSchema={EditUserSchema}
                    >
                        {(props: FormikProps<FormValues>) => {
                            return (
                                <Form noValidate>
                                    {props.isSubmitting ? (
                                        <Loading
                                            type="bubbles"
                                            color="#ff3366"
                                            height={200}
                                            width={200}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="column"
                                            spacing={2}
                                        >
                                            <Field type="hidden" name="id" />
                                            <Grid item>
                                                {props.errors.name &&
                                                props.touched.name ? (
                                                    <Typography color="secondary">
                                                        {props.errors.name}
                                                    </Typography>
                                                ) : null}
                                                <Field
                                                    autoFocus
                                                    component={
                                                        CustomInputComponent
                                                    }
                                                    type="text"
                                                    name="name"
                                                    placeholder="Name"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item>
                                                {props.errors.email &&
                                                props.touched.email ? (
                                                    <Typography color="secondary">
                                                        {props.errors.email}
                                                    </Typography>
                                                ) : null}
                                                <Field
                                                    component={
                                                        CustomInputComponent
                                                    }
                                                    type="email"
                                                    name="email"
                                                    placeholder="Email"
                                                    fullWidth
                                                />
                                            </Grid>
                                            <Grid item>
                                                <Grid
                                                    container
                                                    direction="row"
                                                    rowSpacing={1}
                                                    columnSpacing={2}
                                                >
                                                    <Grid item xs={12} sm={6}>
                                                        <FButton
                                                            variant="contained"
                                                            size="large"
                                                            type="submit"
                                                            disabled={
                                                                props.isSubmitting
                                                            }
                                                            fullWidth
                                                        >
                                                            Save
                                                        </FButton>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FButton
                                                            variant="contained"
                                                            color="secondary"
                                                            size="large"
                                                            onClick={
                                                                handleCloseEditForm
                                                            }
                                                            disabled={
                                                                props.isSubmitting
                                                            }
                                                            fullWidth
                                                        >
                                                            Cancel
                                                        </FButton>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    )}
                                </Form>
                            );
                        }}
                    </Formik>
                </DialogContent>
            </Dialog>
        </Box>
    );
}
