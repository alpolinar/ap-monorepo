import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

import { Paper } from "@ap-monorepo/ui";

export default function AppContainer(
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
