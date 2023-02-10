import * as React from "react";

import HeroLayout from "./HeroLayout";
import Image from "next/image";
import Grid from "@mui/material/Grid";

import { CustomInputComponent, Typography, Button } from "@ap-monorepo/ui";
import * as Yup from "yup";
import { Formik, FormikHelpers, Form, Field } from "formik";

const backgroundImage =
    "https://images.unsplash.com/photo-1506125840744-167167210587?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80";

const SearchSchema = Yup.object().shape({
    search: Yup.string(),
});

type FormValues = {
    search: string;
};

type SearchProduct = {
    handleSubmit: (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => void;
};

export default function Hero({ handleSubmit }: SearchProduct) {
    const initialFormValues: FormValues = { search: "" };
    return (
        <HeroLayout
            sxBackground={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundColor: "#7fc7d9", // Average color of the background image.
                backgroundPosition: "center",
            }}
        >
            {/* Increase the network loading priority of the background image. */}
            <Image
                style={{ display: "none" }}
                src={backgroundImage}
                alt="increase priority"
                width={100}
                height={100}
            />
            <Typography
                color="inherit"
                align="center"
                variant="h2"
                marked="center"
            >
                Weekend Escapades
            </Typography>
            <Typography
                color="inherit"
                align="center"
                variant="h5"
                sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
            >
                Enjoy secret offers up to -70% off the best luxury hotels every
                Sunday.
            </Typography>
            <Formik
                initialValues={initialFormValues}
                validationSchema={SearchSchema}
                onSubmit={handleSubmit}
            >
                {(props) => (
                    <Form noValidate>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item>
                                <Field
                                    component={CustomInputComponent}
                                    name="search"
                                    type="text"
                                    placeholder="Find your next adventure"
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    color="secondary"
                                    variant="contained"
                                    size="large"
                                    type="submit"
                                    sx={{ minWidth: 200 }}
                                    disabled={props.isSubmitting}
                                >
                                    Search
                                </Button>
                            </Grid>
                        </Grid>
                    </Form>
                )}
            </Formik>
        </HeroLayout>
    );
}
