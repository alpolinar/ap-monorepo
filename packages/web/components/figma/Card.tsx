import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/system/Box";
import IconButton from "@mui/material/IconButton";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

import { Product } from "@ap-monorepo/api/src/graphql";

import FButton from "./Button";

import { useCart } from "@/store/cart/cart.hook";

type FCardProps = {
    product: Product;
    sx: {};
};

export default function FCard({ product, sx }: FCardProps) {
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
                ...sx,
            }}
        >
            <Grid container direction="column">
                <Grid item xs={8}>
                    {product.image ? (
                        <Box sx={{ position: "relative" }}>
                            <CardMedia
                                sx={{ height: 200, borderRadius: 4 }}
                                image={product.image}
                                title={product.name}
                            />
                            <IconButton
                                sx={{
                                    position: "absolute",
                                    top: 16,
                                    right: 16,
                                    p: 1.75,
                                    boxShadow: 1,
                                    backgroundColor: "white",
                                }}
                                onClick={handleAddToCart}
                            >
                                <AddShoppingCartIcon />
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
                            {product.name}
                        </Typography>
                        <Typography
                            sx={{
                                fontSize: 20,
                                color: "#27272E",
                                fontWeight: 600,
                            }}
                        >
                            ${product.price}
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
                                href={`/products/${product.id}`}
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
