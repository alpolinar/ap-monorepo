import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AppContainer from "@/views/common/AppContainer";

import { Typography } from "@ap-monorepo/ui";

import FCard from "@/components/figma/Card";

import { Product } from "@ap-monorepo/api/src/graphql";

import { useCart } from "@/store/cart/cart.hook";

type ProductPageProps = {
    products: Product[];
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
                        direction="row"
                    >
                        {products?.map((product) => (
                            <Grid item key={product.id} xs={12} sm={6} md={4}>
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
