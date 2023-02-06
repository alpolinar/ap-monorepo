import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import { Typography } from "../Typography";

type CartItems = {
    items: number;
};

export function CartIcon({ items }: CartItems) {
    return (
        <Box component="div" position="relative">
            <ShoppingCartIcon color="primary" />
            <Typography
                component="span"
                color="secondary"
                sx={{
                    textAlign: "center",
                    width: 10,
                    height: 10,
                    position: "absolute",
                    top: -8,
                    right: -10,
                    backgroundColor: "white",
                    px: 0.5,
                    py: 0.5,
                    borderRadius: "50%",
                    fontSize: 8,
                    boxShadow: 1,
                }}
            >
                {items > 9 ? "9+" : items}
            </Typography>
        </Box>
    );
}
