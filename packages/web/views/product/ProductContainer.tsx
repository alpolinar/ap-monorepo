import React from "react";
import Box from "@mui/material/Box";
import Paper from "../../components/Paper";
import Container from "@mui/material/Container";

export default function ProductContainer(
    props: React.HTMLAttributes<HTMLDivElement>
) {
    const { children } = props;
    return (
        <Box
            sx={{
                display: "flex",
            }}
        >
            <Container maxWidth="lg">
                <Box sx={{ mt: 12, mb: 6 }}>
                    <Paper
                        background="light"
                        sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
                    >
                        {children}
                    </Paper>
                </Box>
            </Container>
        </Box>
    );
}
