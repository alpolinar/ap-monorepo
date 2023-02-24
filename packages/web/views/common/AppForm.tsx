import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import { Paper } from "@ap-monorepo/ui";
import FAppBar from "@/components/figma/AppBar";

export default function AppForm(props: React.HTMLAttributes<HTMLDivElement>) {
    const { children } = props;

    return (
        <>
            <FAppBar />
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Container maxWidth="sm">
                    <Box sx={{ mt: 12, mb: 12 }}>
                        <Paper
                            background="light"
                            sx={{ py: { xs: 4, md: 8 }, px: { xs: 3, md: 6 } }}
                        >
                            {children}
                        </Paper>
                    </Box>
                </Container>
            </Box>
        </>
    );
}
