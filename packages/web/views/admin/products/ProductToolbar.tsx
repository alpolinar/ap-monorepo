import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { Button, SearchInput, Typography } from "@ap-monorepo/ui";

import { useProducts } from "@/store/product/product.hooks";

type ProductToolbarProps = {
    handleOpenProductDialog: () => void;
};

export default function ProductToolbar(props: ProductToolbarProps) {
    const applySearchFilter = useProducts().applySearchFilter;

    const handleApplyFilter = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        applySearchFilter(e.currentTarget.value);
    };

    return (
        <Grid
            container
            direction="row"
            alignItems="center"
            sx={{ p: 1, mb: 3 }}
        >
            <Grid item xs={12} md={4}>
                <Typography variant="h4">Products</Typography>
            </Grid>
            <Grid item xs={12} md={4}>
                <SearchInput onChange={handleApplyFilter} />
            </Grid>
            <Grid item xs={12} md={4}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: { md: "flex-end", xs: "center" },
                    }}
                >
                    <Button
                        color="primary"
                        size="small"
                        variant="contained"
                        onClick={props.handleOpenProductDialog}
                    >
                        Add Product
                    </Button>
                </Box>
            </Grid>
        </Grid>
    );
}
