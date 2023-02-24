import React, { useState } from "react";

import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";

import { Product } from "@ap-monorepo/api/src/graphql";

import { Typography } from "@ap-monorepo/ui";

import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { useProducts } from "@/store/product/product.hooks";
import { ProductDeleteDialog } from "./ProductDeleteDialog";
import { ProductEditDialog } from "./ProductEditDialog";

export type ProductProps = {
    products: Product[];
};

export default function ProductTableResults({ products }: ProductProps) {
    const searchFilter = useProducts().searchFilter;
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [deleteProductId, setDeleteProductId] = useState<string>("");
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null
    );

    const handleOpenDeleteDialog = () => {
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    const handleOpenEditDialog = () => {
        setOpenEditDialog(true);
    };
    const handleCloseEditDialog = () => {
        setOpenEditDialog(false);
    };

    const handleEditProduct = (
        e: React.MouseEvent<HTMLTableRowElement, MouseEvent>
    ) => {
        const id = e.currentTarget.id;
        if (
            !(e.target instanceof HTMLInputElement) &&
            !(e.target instanceof SVGElement) &&
            !(e.target instanceof HTMLButtonElement)
        ) {
            const product = products.filter((item) => item.id === id)[0];
            handleOpenEditDialog();
            setSelectedProduct(product);
        }
    };

    return (
        <>
            <TableBody>
                {products &&
                    products
                        .filter((product) => {
                            return searchFilter === ""
                                ? product
                                : product.name
                                      .toLocaleLowerCase()
                                      .includes(searchFilter);
                        })
                        .map((product, index) => {
                            return (
                                <TableRow
                                    id={product.id}
                                    key={index}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                        cursor: "default",
                                    }}
                                    onClick={handleEditProduct}
                                >
                                    <TableCell component="th" scope="row">
                                        {product.name}
                                    </TableCell>
                                    <TableCell>
                                        <Card sx={{ maxWidth: 250 }}>
                                            <CardMedia
                                                component="img"
                                                alt={product.name}
                                                height="100"
                                                image={product.image}
                                            />
                                        </Card>
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 350 }}>
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                display: "-webkit-box",
                                                lineClamp: 4,
                                                boxOrient: "vertical",
                                                WebkitLineClamp: "4",
                                                WebkitBoxOrient: "vertical",
                                                wordBreak: "break-all",
                                            }}
                                        >
                                            {product.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        {product.price.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: "flex",
                                                justifyContent: "space-between",
                                                alignItems: "center",
                                            }}
                                        >
                                            {product.inventory}
                                            <IconButton
                                                sx={(theme) => ({
                                                    color: theme.palette.error
                                                        .dark,
                                                    ":hover": {
                                                        backgroundColor:
                                                            theme.palette.error
                                                                .light,
                                                    },
                                                })}
                                                onClick={() => {
                                                    handleOpenDeleteDialog();
                                                    setDeleteProductId(
                                                        product.id
                                                    );
                                                }}
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
            </TableBody>
            <ProductDeleteDialog
                open={openDeleteDialog}
                title="Delete Product"
                productId={deleteProductId}
                onClose={handleCloseDeleteDialog}
            />
            <ProductEditDialog
                open={openEditDialog}
                title="Edit Product"
                product={selectedProduct}
                onClose={handleCloseEditDialog}
            />
        </>
    );
}
