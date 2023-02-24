import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AppContainer from "@/views/common/AppContainer";

import { Typography } from "@ap-monorepo/ui";

import FCard from "@/components/figma/Card";

import { Product } from "@ap-monorepo/api/src/graphql";

type ProductPageProps = {
    products: Product[];
};

export default function ProductsPage({ products }: ProductPageProps) {
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
                                <FCard product={product} />
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
