import * as React from "react";

import Card, { CardProps } from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { ProductData } from "@/db/sqlite/db-types";

import FButton from "./Button";

import { useCart } from "@/store/cart/cart.hook";

export default function FCard({
    id,
    image,
    name,
    price,
    product,
    props,
}: Partial<ProductData> & { product: ProductData; props?: CardProps }) {
    const cart = useCart();
    const cartItems = cart.cartItems;

    function handleAddToCart() {
        cart.addItemToCart(cartItems, product);
    }
    return (
        <Card
            sx={{
                p: 1,
                borderRadius: 4,
                minWidth: 275,
                maxWidth: 350,
            }}
        >
            <Grid container direction="column">
                <Grid item xs={8}>
                    {image ? (
                        <Box sx={{ position: "relative" }}>
                            <CardMedia
                                sx={{ height: 200, borderRadius: 4 }}
                                image={image}
                                title={name}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    p: 0,
                                    borderRadius: 50,
                                    minWidth: 0,
                                    boxShadow: 1,
                                }}
                                onClick={handleAddToCart}
                            >
                                <AddShoppingCartIcon
                                    sx={{
                                        background: "white",
                                        p: 1.75,
                                        borderRadius: "50%",
                                    }}
                                />
                            </IconButton>
                        </Box>
                    ) : (
                        <Skeleton
                            variant="rectangular"
                            height={200}
                            sx={{ borderRadius: 1 }}
                        />
                    )}
                </Grid>
                <Grid item xs={4}>
                    <CardContent>
                        <Typography
                            sx={{
                                color: "#425466",
                                fontSize: 14,
                                fontWeight: 600,
                                lineHeight: 3,
                            }}
                        >
                            {name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 20,
                                color: "#27272E",
                                fontWeight: 600,
                            }}
                        >
                            ${parseInt(`${price}`).toFixed(2)}
                        </Typography>
                    </CardContent>
                    <Grid
                        container
                        direction="row"
                        columnSpacing={2}
                        rowSpacing={1}
                    >
                        <Grid item xs={12} sm={6}>
                            <FButton
                                size="small"
                                variant="contained"
                                borderRadius={50}
                                fullWidth
                                href={`/products/${id}`}
                            >
                                View
                            </FButton>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FButton
                                size="small"
                                variant="contained"
                                borderRadius={50}
                                fullWidth
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </FButton>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Card>
    );
}
