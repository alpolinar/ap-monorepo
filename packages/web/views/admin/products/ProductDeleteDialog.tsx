import React from "react";

import Grid from "@mui/material/Grid";

import { SimpleDialog, Typography, Button } from "@ap-monorepo/ui";

import { useProducts } from "@/store/product/product.hooks";

type DeleteDialogProps = {
    open: boolean;
    title: string;
    productId: string;
    onClose: () => void;
};

export const ProductDeleteDialog = (props: DeleteDialogProps) => {
    const deleteProduct = useProducts().deleteProduct;
    const { open, title, onClose, productId } = props;

    const handleDeleteProduct = (id: string) => {
        try {
            deleteProduct(id);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <SimpleDialog open={open} title={title} onClose={onClose}>
            <Grid container direction="column" gap={2}>
                <Grid container>
                    <Grid item>
                        <Typography>
                            Are you sure you want to delete this product?
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item>
                    <Grid container justifyContent="space-between">
                        <Grid item>
                            <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                onClick={onClose}
                            >
                                No
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="small"
                                onClick={() => {
                                    onClose();
                                    handleDeleteProduct(productId);
                                }}
                            >
                                Yes
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </SimpleDialog>
    );
};
