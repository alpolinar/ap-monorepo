import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";

import CartItemCard from "./CartItemCard";

import { useCart } from "@/store/cart/cart.hook";
import { IconButton } from "@mui/material";

import { CartIcon, Typography, Button } from "@ap-monorepo/ui";

export default function CartDrawer() {
    const cart = useCart();
    const cartCount = cart.cartCount;
    const cartItems = cart.cartItems;
    const cartTotal = cart.cartTotal;

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer =
        (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event.type === "keydown" &&
                ((event as React.KeyboardEvent).key === "Tab" ||
                    (event as React.KeyboardEvent).key === "Shift")
            ) {
                return;
            }
            setIsDrawerOpen(open);
        };

    const list = () => (
        <Box sx={{ width: 350 }} role="presentation">
            {cartItems.length ? (
                cartItems.map((item) => (
                    <CartItemCard key={item.id} {...item} />
                ))
            ) : (
                <Typography variant="h6">Cart is Empty</Typography>
            )}
            <Divider />
        </Box>
    );

    return (
        <Box key={"right"}>
            <IconButton
                onClick={toggleDrawer(true)}
                sx={{
                    borderRadius: 0,
                    ":hover": { background: "none" },
                    mx: 1,
                }}
            >
                <CartIcon items={cartItems.length} />
            </IconButton>
            <Drawer
                anchor={"right"}
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box sx={{ p: 1 }}>
                    {list()}
                    <Grid container sx={{ py: 2 }}>
                        <Grid item>
                            <Typography variant="subtitle1">
                                Total: ${parseFloat(`${cartTotal}`).toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Button
                        size="small"
                        color="secondary"
                        variant="contained"
                        fullWidth
                        href={cartItems.length ? "/orders" : "/products"}
                    >
                        {cartItems.length
                            ? "Proceed to Checkout"
                            : "Browse Products"}
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
}
