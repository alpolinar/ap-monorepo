import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AppContainer from "@/views/common/AppContainer";

import Typography from "@/components/Typography";

import FCard from "@/components/figma/Card";
import ProductCard from "./ProductCard";

import { ProductData } from "@/db/sqlite/db-types";

import { useCart } from "@/store/cart/cart.hook";

type ProductPageProps = {
    products: Array<ProductData>;
};

export default function ProductsPage({ products }: ProductPageProps) {
    const cart = useCart();
    const cartItems = cart.cartItems;

    return (
        <AppContainer>
            {products.length > 0 ? (
                <Container sx={{ display: "flex" }}>
                    <Grid
                        container
                        rowGap={4}
                        columnSpacing={4}
                        justifyContent="space-evenly"
                    >
                        {products?.map((product) => (
                            <Grid item key={product.id}>
                                <FCard
                                    id={product.id}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    product={product}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            ) : (
                <Typography variant="h4">No products found.</Typography>
            )}
        </AppContainer>
    );
}
