import AppForm from "@/views/common/AppForm";
import Footer from "@/views/common/Footer";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import {
    Button,
    CustomInputComponent,
    Loading,
    Typography,
} from "@ap-monorepo/ui";

import { Field, Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email"),
});

interface FormValues {
    email: string;
    password: string;
}

type SignIn = {
    handleSubmit: (
        values: FormValues,
        actions: FormikHelpers<FormValues>
    ) => void;
};

export default function SignIn({ handleSubmit }: SignIn) {
    const initialFormValues: FormValues = { email: "", password: "" };

    return (
        <>
            <AppForm>
                <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                >
                    Sign In
                </Typography>
                <Typography variant="body2" align="center">
                    {"Not a member yet? "}
                    <Link href="/register/" align="center" underline="always">
                        Sign Up here
                    </Link>
                </Typography>
                <Box sx={{ mt: 4 }}>
                    <Formik
                        initialValues={initialFormValues}
                        onSubmit={handleSubmit}
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
                                            sx={{ mb: 2 }}
                                            color="secondary"
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
                <Typography align="center">
                    <Link underline="always" href="/forgot-password">
                        Forgot password?
                    </Link>
                </Typography>
            </AppForm>
            <Footer />
        </>
    );
}
