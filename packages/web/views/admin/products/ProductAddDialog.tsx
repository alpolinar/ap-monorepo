import React, { useEffect, useState } from "react";
import {
    Button,
    CustomInputComponent,
    Loading,
    Typography,
    SimpleDialog,
} from "@ap-monorepo/ui";

import Box from "@mui/material/Box";
import ListAltIcon from "@mui/icons-material/ListAlt";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";

import { useProducts } from "@/store/product/product.hooks";

import { Field, Form, Formik, FormikHelpers, useFormikContext } from "formik";
import * as Yup from "yup";

import { currencyFormatter } from "@/utils/currencyFormatter";

interface FormValues {
    name: string;
    image: string;
    description: string;
    price: number;
    inventory: number;
}

const AddProductSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Must be more than 1 character.")
        .required("Name is required."),
    image: Yup.string().required("Image URL is required."),
    description: Yup.string()
        .min(20, "Must be at leat 20 characters.")
        .required("Description is required."),
    price: Yup.string()
        .min(1, "Must be greater than 0.")
        .required("Price is required."),
    inventory: Yup.number()
        .positive()
        .min(1, "Must be greater than or equal to 1.")
        .max(100, "Must be less than or equal to 100.")
        .required("Inventory is required"),
});

type ProductAddDialogProps = {
    open: boolean;
    title: string;
    onClose: () => void;
};

export const ProductAddDialog = (props: ProductAddDialogProps) => {
    const { open, title, onClose } = props;

    const createProduct = useProducts().createProduct;

    const handleAddProduct = async (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => {
        try {
            createProduct({
                ...values,
                price: parseFloat(`${values.price}`),
            });
            actions.resetForm();
            onClose();
        } catch (error) {
            console.log(error);
        }
    };

    const initialValues: FormValues = {
        name: "",
        image: "",
        description: "",
        price: 99.99,
        inventory: 1,
    };

    return (
        <SimpleDialog
            open={open}
            title={title}
            onClose={onClose}
            dialogIcon={<ListAltIcon />}
        >
            <Formik
                initialValues={initialValues}
                onSubmit={handleAddProduct}
                validationSchema={AddProductSchema}
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
                            <>
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
                                        justifyContent: "flex-end",
                                    }}
                                >
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="small"
                                    >
                                        Create Product
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
