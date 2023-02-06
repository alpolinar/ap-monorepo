import React, { EventHandler } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";

import { useCart } from "@/store/cart/cart.hook";

import { TextField } from "@ap-monorepo/ui";

import { ProductData } from "@/db/sqlite/db-types";

export default function OrdersCard(
    props: Omit<ProductData, "description"> & { quantity: number }
) {
    const cart = useCart();
    const cartItems = cart.cartItems;
    const cartCount = cart.cartCount;

    function handleQuantity(e: React.ChangeEvent<HTMLInputElement>) {
        if (parseInt(e.target.value) > props.quantity) {
            cart.addItemToCart(cartItems, props);
        } else {
            cart.removeItemFromCart(cartItems, props);
        }
        console.log("handleQuantityChange");
    }

    function handleRemoveItemFromCart(
        e: React.MouseEvent<SVGSVGElement, MouseEvent>
    ) {
        const item = cartItems.filter(
            (item) => item.id === e.currentTarget.id
        )[0];
        cart.clearItemFromCart(cartItems, item);
    }

    return (
        <Card sx={{ display: "flex", mb: 1 }}>
            <CardMedia
                component="img"
                sx={{ width: 200 }}
                image={props.image}
                alt={props.name}
            />
            <Box
                sx={{ display: "flex", flexDirection: "column", width: "100%" }}
            >
                <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography component="p" variant="h6" sx={{ mb: 1 }}>
                        {props.name}
                    </Typography>
                    <Grid container justifyItems="center" sx={{ mb: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography
                                variant="body1"
                                color="text.secondary"
                                component="div"
                            >
                                $
                                {parseFloat(
                                    `${props.price * props.quantity}`
                                ).toFixed(2)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                size="small"
                                type="number"
                                inputProps={{ min: 1, max: 10 }}
                                value={props.quantity}
                                onChange={handleQuantity}
                            />
                        </Grid>
                    </Grid>
                </CardContent>
            </Box>
            <CloseIcon
                id={props.id}
                color="primary"
                fontSize="small"
                sx={{ position: "relative", right: 2, top: 2 }}
                onClick={handleRemoveItemFromCart}
            />
        </Card>
    );
}
