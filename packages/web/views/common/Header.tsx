import React from "react";
import { useRouter } from "next/router";

import AppBar from "@/components/AppBar";
import Toolbar from "@/components/Toolbar";
import Button from "@/components/Button";
import CartDrawer from "../product/CartDrawer";

import { Box, Link } from "@mui/material";

import { useAuthentication } from "@/store/authentication/authentication.hook";

import Cookies from "js-cookie";

const rightLink = {
    fontSize: 16,
    color: "common.white",
    ml: 3,
};

type IHeader = {
    token?: string | null | undefined;
};

export default function Header() {
    const userAuth = useAuthentication();
    const user = userAuth.user;

    const router = useRouter();

    function handleLogout() {
        Cookies.remove("token");
        userAuth.setUser(null);
        router.push("/sign-in");
    }
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ justifyContent: "space-between" }}>
                <Link
                    variant="h6"
                    underline="none"
                    color="inherit"
                    href="/"
                    sx={{ fontSize: 24 }}
                >
                    {"Awesome e-Comm"}
                </Link>
                <Box
                    sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                    }}
                >
                    <Link
                        color="inherit"
                        variant="h6"
                        underline="none"
                        href="/products"
                        sx={rightLink}
                    >
                        {"Browse"}
                    </Link>

                    {user ? (
                        <Box>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href="/account"
                                sx={rightLink}
                            >
                                {"Account"}
                            </Link>
                            <Button
                                color="secondary"
                                variant="contained"
                                size="small"
                                onClick={handleLogout}
                                sx={{ ml: 3 }}
                            >
                                Signout
                            </Button>
                        </Box>
                    ) : (
                        <Box>
                            <Link
                                color="inherit"
                                variant="h6"
                                underline="none"
                                href="/sign-in"
                                sx={rightLink}
                            >
                                {"Sign In"}
                            </Link>
                            <Link
                                variant="h6"
                                underline="none"
                                href="/sign-up"
                                sx={{
                                    ...rightLink,
                                    color: "secondary.main",
                                }}
                            >
                                {"Sign Up"}
                            </Link>
                        </Box>
                    )}
                    <CartDrawer />
                </Box>
            </Toolbar>
        </AppBar>
    );
}
