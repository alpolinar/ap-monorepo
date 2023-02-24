import React from "react";

import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

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
                <Grid
                    container
                    gap={2}
                    sx={{
                        justifyContent: {
                            xs: "center",
                            sm: "space-between",
                        },
                    }}
                >
                    {products?.map((product) => (
                        <Grid
                            item
                            key={product.id}
                            xs={12}
                            sm={5}
                            justifyContent="center"
                        >
                            <FCard product={product} sx={{ m: "0 auto" }} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography variant="h4">No products found.</Typography>
            )}
        </AppContainer>
    );
}
