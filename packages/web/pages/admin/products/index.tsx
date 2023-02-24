import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";

import { SimpleDialog } from "@ap-monorepo/ui";

import AdminLayout from "@/views/admin/AdminLayout";
import { ProductAddDialog } from "@/views/admin/products/ProductAddDialog";
import ProductTableHeader from "@/views/admin/products/ProductTableHeader";

import ProductTableResults from "@/views/admin/products/ProductTableResults";

import ProductToolbar from "@/views/admin/products/ProductToolbar";

import { FormikHelpers } from "formik";
import { useProducts } from "@/store/product/product.hooks";

export default function Products() {
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const fetchProducts = useProducts().fetchAllProducts;
    const products = useProducts().products.items;

    useEffect(() => {
        fetchProducts();
    }, [products]);

    const productHeaders = [
        "Name",
        "Image",
        "Description",
        "Price",
        "Inventory",
    ];

    const handleOpenAddProductDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseAddProductDialog = () => {
        setOpenDialog(false);
    };

    return (
        <AdminLayout>
            <Box maxWidth={1050}>
                <ProductToolbar
                    handleOpenProductDialog={handleOpenAddProductDialog}
                />
                {products && (
                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 550 }}
                            aria-label="product-table"
                        >
                            <ProductTableHeader headers={productHeaders} />
                            <ProductTableResults products={products} />
                        </Table>
                    </TableContainer>
                )}
            </Box>
            <ProductAddDialog
                open={openDialog}
                title="Add Product Details"
                onClose={handleCloseAddProductDialog}
            />
        </AdminLayout>
    );
}
