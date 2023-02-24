import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { RootState } from "../store";
import { IModel, productActions } from "./product.model";
import { CreateProductInput, Product } from "@ap-monorepo/api/src/graphql";

const selectProductsReducer = (state: RootState): IModel => state.product;

const selectProduct = createSelector([selectProductsReducer], (s) => s.product);

const selectProducts = createSelector(
    [selectProductsReducer],
    (s) => s.products
);

const selectProductIsLoading = createSelector(
    [selectProductsReducer],
    (s) => s.product.isLoading
);

const selectProductsIsLoading = createSelector(
    [selectProductsReducer],
    (s) => s.products.isLoading
);

const selectSearchFilter = createSelector(
    [selectProductsReducer],
    (s) => s.searchFilter
);

export const useProducts = () => {
    const dispatch = useDispatch();

    const product = useSelector(selectProduct);
    const products = useSelector(selectProducts);
    const productIsLoading = useSelector(selectProductIsLoading);
    const productsIsLoading = useSelector(selectProductsIsLoading);
    const searchFilter = useSelector(selectSearchFilter);

    function createProduct(product: CreateProductInput) {
        dispatch(productActions.createProduct.request(product));
    }

    function fetchProductById(id: string) {
        dispatch(productActions.fetchProductById.request(id));
    }

    function fetchAllProducts() {
        dispatch(productActions.fetchProducts.request());
    }

    function applySearchFilter(keyword: string) {
        dispatch(productActions.applySearchFilter(keyword));
    }

    function updateProduct(product: Product) {
        dispatch(productActions.updateProduct.request(product));
    }

    function deleteProduct(id: string) {
        dispatch(productActions.deleteProduct.request(id));
    }

    return {
        createProduct,
        updateProduct,
        deleteProduct,
        product,
        products,
        fetchProductById,
        fetchAllProducts,
        productIsLoading,
        productsIsLoading,
        searchFilter,
        applySearchFilter,
    };
};
