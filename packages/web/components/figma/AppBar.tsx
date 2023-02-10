import * as React from "react";
import { useRouter } from "next/router";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";

import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

import { Typography } from "@ap-monorepo/ui";
import FButton from "./Button";

import CartDrawer from "@/views/product/CartDrawer";

import { useAuthentication } from "@/store/authentication/authentication.hook";

import Cookies from "js-cookie";

type Pages = {
    name: string;
    href: string;
};

const pages: Pages[] = [
    {
        name: "Browse",
        href: "/products",
    },
];

function ResponsiveAppBar() {
    const userAuth = useAuthentication();
    const user = userAuth.user;
    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        userAuth.setUser(null);
        router.push("/sign-in");
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                background: "white",
            }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                display: { xs: "none", md: "flex" },
                                fontWeight: 700,
                                color: "#131313",
                                textDecoration: "none",
                            }}
                        >
                            Awesome e-comm
                        </Typography>
                    </Box>

                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: "flex", md: "none" },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            sx={{
                                color: "#131313",
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            <MenuItem href="/products" component="a">
                                <Typography textAlign="center">
                                    Browse
                                </Typography>
                            </MenuItem>
                            {user ? (
                                <Box>
                                    <MenuItem href="/account" component="a">
                                        <Typography textAlign="center">
                                            Account
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">
                                            Log Out
                                        </Typography>
                                    </MenuItem>
                                </Box>
                            ) : (
                                <Box>
                                    <MenuItem href="/register" component="a">
                                        <Typography textAlign="center">
                                            Register
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem href="/sign-in" component="a">
                                        <Typography textAlign="center">
                                            Log In
                                        </Typography>
                                    </MenuItem>
                                </Box>
                            )}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            color: "#131313",
                            fontWeight: 700,
                            textDecoration: "none",
                        }}
                    >
                        Awesome e-comm
                    </Typography>

                    <Grid
                        container
                        justifyContent="flex-end"
                        sx={{ display: { xs: "none", md: "flex" } }}
                    >
                        <Grid item>
                            <Grid
                                container
                                sx={{
                                    flexGrow: 1,
                                    display: { xs: "none", md: "flex" },
                                }}
                            >
                                <Grid item>
                                    <FButton
                                        variant="text"
                                        borderRadius={1}
                                        size="small"
                                        href="/products"
                                        sx={{ fontSize: 16 }}
                                    >
                                        Browse
                                    </FButton>
                                    {user ? (
                                        <>
                                            <FButton
                                                variant="text"
                                                borderRadius={1}
                                                size="small"
                                                href="/account"
                                                sx={{ fontSize: 16 }}
                                            >
                                                Account
                                            </FButton>
                                            <FButton
                                                variant="contained"
                                                size="small"
                                                onClick={handleLogout}
                                            >
                                                Log Out
                                            </FButton>
                                        </>
                                    ) : (
                                        <>
                                            <FButton
                                                variant="text"
                                                borderRadius={1}
                                                size="small"
                                                href="/register"
                                                sx={{ fontSize: 16 }}
                                            >
                                                Register
                                            </FButton>
                                            <FButton
                                                variant="contained"
                                                size="small"
                                                href="/sign-in"
                                            >
                                                Log In
                                            </FButton>
                                        </>
                                    )}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <CartDrawer />
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
