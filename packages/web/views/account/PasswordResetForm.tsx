import React from "react";
import Box from "@mui/material/Box";
import Footer from "@/views/common/Footer";
import AppForm from "../common/AppForm";

import { Typography, Button, TextField } from "@ap-monorepo/ui";

export default function ForgotPasswordForm() {
    return (
        <>
            <AppForm>
                <Typography
                    variant="h3"
                    gutterBottom
                    marked="center"
                    align="center"
                >
                    Forgot your password?
                </Typography>
                <Typography variant="body2" align="center">
                    {"Enter your email address below and we'll " +
                        "send you a link to reset your password."}
                </Typography>

                <Box component="form" noValidate sx={{ mt: 6 }}>
                    <TextField
                        type="email"
                        placeholder="Email"
                        fullWidth
                        sx={{ mb: 2 }}
                    />
                    <Button
                        sx={{ mb: 2 }}
                        size="large"
                        color="secondary"
                        variant="contained"
                        fullWidth
                    >
                        Send Reset Link
                    </Button>
                </Box>
            </AppForm>
            <Footer />
        </>
    );
}
