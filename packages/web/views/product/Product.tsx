import React from "react";

import Box from "@mui/material/Box";

import AppContainer from "@/views/common/AppContainer";

import { ProductData } from "@/db/sqlite/db-types";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { Typography, Button } from "@ap-monorepo/ui";

type ProductPageProps = {
    product: ProductData;
    handleAddToCart?: () => void;
};

export default function ProductPage({
    product,
    handleAddToCart,
}: ProductPageProps) {
    return (
        <AppContainer>
            <Button
                variant="contained"
                size="small"
                startIcon={<ArrowBackIcon />}
                href="/products"
            >
                Back
            </Button>
            <Typography variant="h3">{product.name}</Typography>
            <Box
                component="img"
                src={product.image}
                alt={product.name}
                width={"100%"}
                sx={{ mb: 2 }}
            />
            <Typography variant="body2" paragraph={true} sx={{ mb: 4 }}>
                {product.description}
            </Typography>
            <Button
                onClick={handleAddToCart}
                color="secondary"
                variant="contained"
                size="small"
            >
                Book it!
            </Button>
        </AppContainer>
    );
}
