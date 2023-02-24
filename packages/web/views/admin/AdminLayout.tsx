import React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";

import AdminAppBar from "./AdminAppBar";
import AdminDrawer from "./AdminDrawer";
import { DrawerHeader } from "./AdminDrawerHeader";

import { Typography } from "@ap-monorepo/ui/";

export default function AdminLayout(
    props: React.HTMLAttributes<HTMLDivElement>
) {
    const { children } = props;

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <AdminAppBar
                drawerOpen={open}
                handleDrawerOpen={handleDrawerOpen}
            />
            <AdminDrawer
                drawerOpen={open}
                handleDrawerClose={handleDrawerClose}
            />
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {children}
            </Box>
        </Box>
    );
}
