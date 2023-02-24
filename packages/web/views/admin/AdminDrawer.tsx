import React from "react";
import { useRouter } from "next/router";
import MuiDrawer from "@mui/material/Drawer";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import InventoryIcon from "@mui/icons-material/Inventory";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { DrawerHeader } from "./AdminDrawerHeader";

import { Typography } from "@ap-monorepo/ui";
import { SvgIconComponent } from "@mui/icons-material";

const drawerWidth = 270;

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    ...(open && {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
    }),
}));

type AdminDrawerProps = {
    drawerOpen: boolean;
    handleDrawerClose: () => void;
};

type Menu = {
    name: string;
    icon: SvgIconComponent;
    path: string;
};

const menu: Menu[] = [
    {
        name: "Dashboard",
        icon: DashboardIcon,
        path: "dashboard",
    },
    {
        name: "Products",
        icon: InventoryIcon,
        path: "products",
    },
    {
        name: "Orders",
        icon: ShoppingCartIcon,
        path: "orders",
    },
];

export default function AdminDrawer({
    drawerOpen,
    handleDrawerClose,
}: AdminDrawerProps) {
    const theme = useTheme();
    const router = useRouter();
    return (
        <Drawer variant="permanent" open={drawerOpen}>
            <DrawerHeader>
                <Typography variant="h6">Awesome E-comm</Typography>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === "rtl" ? (
                        <ChevronRightIcon />
                    ) : (
                        <ChevronLeftIcon />
                    )}
                </IconButton>
            </DrawerHeader>
            <Divider />
            <List>
                {menu.map((item) => (
                    <ListItem
                        key={item.name}
                        disablePadding
                        sx={{ display: "block" }}
                    >
                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: drawerOpen
                                    ? "initial"
                                    : "center",
                                px: 2.5,
                            }}
                            onClick={() => router.push(item.path)}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: drawerOpen ? 3 : "auto",
                                    justifyContent: "center",
                                }}
                            >
                                <item.icon />
                            </ListItemIcon>
                            <ListItemText
                                primary={item.name}
                                sx={{ opacity: drawerOpen ? 1 : 0 }}
                            />
                        </ListItemButton>
                        <Divider />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
