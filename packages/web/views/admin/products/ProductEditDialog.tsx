import React, { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";

import {
    SimpleDialog,
    Typography,
    Button,
    CustomInputComponent,
    Loading,
} from "@ap-monorepo/ui";

import { useProducts } from "@/store/product/product.hooks";
import { Product } from "@ap-monorepo/api/src/graphql";

import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { currencyFormatter } from "@/utils/currencyFormatter";

interface FormValues {
    id: string;
    name: string;
    image: string;
    description: string;
    price: number;
    inventory: number;
}

type EditDialogProps = {
    open: boolean;
    title: string;
    product: Product | null;
    onClose: () => void;
};

export const ProductEditDialog = (props: EditDialogProps) => {
    const { open, title, onClose, product } = props;
    const updateProduct = useProducts().updateProduct;

    const handleEditProduct = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        updateProduct({
            ...values,
            price: parseFloat(`${values.price}`),
        });
        actions.resetForm();
        onClose();
    };

    const initialValues = {
        id: product?.id || "",
        name: product?.name || "",
        image: product?.image || "",
        description: product?.description || "",
        price: product?.price || 0,
        inventory: product?.inventory || 0,
    };

    return (
        <SimpleDialog open={open} title={title} onClose={onClose}>
            <Formik initialValues={initialValues} onSubmit={handleEditProduct}>
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
                            <>
                                <Field type="hidden" name="id" />
                                {props.errors.name && props.touched.name ? (
                                    <Typography color="secondary" mb={1}>
                                        {props.errors.name}
                                    </Typography>
                                ) : null}
                                <Field
                                    component={CustomInputComponent}
                                    name="name"
                                    type="text"
                                    placeholder="Name"
                                    label="Name"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    noBorder
                                />
                                {props.errors.image && props.touched.image ? (
                                    <Typography color="secondary" mb={1}>
                                        {props.errors.image}
                                    </Typography>
                                ) : null}
                                <Field
                                    component={CustomInputComponent}
                                    name="image"
                                    type="text"
                                    placeholder="Image"
                                    label="Image"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    noBorder
                                />
                                {props.errors.description &&
                                props.touched.description ? (
                                    <Typography color="secondary" mb={1}>
                                        {props.errors.description}
                                    </Typography>
                                ) : null}
                                <Field
                                    component={CustomInputComponent}
                                    name="description"
                                    type="text"
                                    placeholder="Description"
                                    label="Description"
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    noBorder
                                />
                                {props.errors.price && props.touched.price ? (
                                    <Typography color="secondary" mb={1}>
                                        {props.errors.price}
                                    </Typography>
                                ) : null}
                                <Field
                                    component={CustomInputComponent}
                                    name="price"
                                    type="text"
                                    placeholder="Price"
                                    label="Price"
                                    InputProps={{
                                        startAdornment: (
                                            <Box
                                                sx={{
                                                    pl: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <AttachMoneyIcon fontSize="small" />
                                            </Box>
                                        ),
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    noBorder
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        const priceRegEx = /[0-9]+\.[0-9]{2}$/;
                                        let formattedVal = currencyFormatter({
                                            value: parseFloat(
                                                e.currentTarget.value
                                            ),
                                            locale: "en-CA",
                                            style: "currency",
                                            currency: "CAD",
                                        }).replace("$", "");
                                        console.log(formattedVal);
                                        console.log(
                                            priceRegEx.test(formattedVal)
                                        );
                                        if (!priceRegEx.test(formattedVal))
                                            formattedVal = currencyFormatter({
                                                value: parseFloat("1"),
                                                locale: "en-CA",
                                                style: "currency",
                                                currency: "CAD",
                                            }).replace("$", "");

                                        props.setFieldValue(
                                            "price",
                                            formattedVal
                                        );
                                    }}
                                />
                                {props.errors.inventory &&
                                props.touched.inventory ? (
                                    <Typography color="secondary" mb={1}>
                                        {props.errors.inventory}
                                    </Typography>
                                ) : null}
                                <Field
                                    component={CustomInputComponent}
                                    name="inventory"
                                    type="text"
                                    placeholder="Inventory"
                                    label="Inventory"
                                    InputProps={{
                                        startAdornment: (
                                            <Box
                                                sx={{
                                                    pl: 1,
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <InventoryIcon fontSize="small" />
                                            </Box>
                                        ),
                                    }}
                                    fullWidth
                                    sx={{ mb: 2 }}
                                    noBorder
                                    onChange={(
                                        e: React.FormEvent<HTMLInputElement>
                                    ) => {
                                        const inventoryRegEx = /^[0-9]+$/;
                                        if (
                                            !inventoryRegEx.test(
                                                e.currentTarget.value
                                            )
                                        )
                                            e.currentTarget.value = "1";

                                        props.setFieldValue(
                                            "inventory",
                                            parseInt(e.currentTarget.value)
                                        );
                                    }}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        size="small"
                                        onClick={onClose}
                                    >
                                        Cancle
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                    >
                                        Update Product
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Form>
                )}
            </Formik>
        </SimpleDialog>
    );
};
