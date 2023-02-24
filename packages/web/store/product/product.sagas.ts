import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApolloQueryResult, gql } from "@apollo/client";
import {
    PRODUCTS_ACTION_TYPES,
    createProduct,
    createProductRequestType,
    fetchProductById,
    fetchProductByIdRequestType,
    fetchProducts,
    fetchProductsRequestType,
    deleteProduct,
    deleteProductRequestType,
    updateProduct,
    updateProductRequestType,
} from "./product.model";
import { Product, ProductDelete } from "@ap-monorepo/api/src/graphql";
import { apolloClient } from "../../services/apolloClient";

export function* createProductAsync({ payload }: createProductRequestType) {
    try {
        const result: ApolloQueryResult<{ createProduct: Product }> =
            yield call(apolloClient({}).mutate, {
                mutation: gql`
                    mutation createProduct($input: CreateProductInput!) {
                        createProduct(input: $input) {
                            name
                            image
                            description
                            price
                            inventory
                        }
                    }
                `,
                variables: {
                    input: payload,
                },
            });

        yield put(createProduct.success(result.data.createProduct));
    } catch (error) {
        yield put(createProduct.failure(error as Error));
    }
}

export function* fetchProductByIdAsync({
    payload,
}: fetchProductByIdRequestType) {
    try {
        const result: ApolloQueryResult<{ fetchProductById: Product }> =
            yield call(apolloClient({}).query, {
                query: gql`
                    query fetchProductById($id: String!) {
                        fetchProductById(id: $id) {
                            id
                            name
                            image
                            description
                            price
                            inventory
                        }
                    }
                `,
                variables: {
                    id: payload,
                },
            });

        yield put(fetchProductById.success(result.data.fetchProductById));
    } catch (error) {
        yield put(fetchProductById.failure(error as Error));
    }
}

export function* fetchProductsAsync() {
    try {
        const result: ApolloQueryResult<{ fetchProducts: Product[] }> =
            yield call(apolloClient({}).query, {
                query: gql`
                    query fetchProducts {
                        fetchProducts {
                            id
                            name
                            image
                            description
                            price
                            inventory
                        }
                    }
                `,
            });

        yield put(fetchProducts.success(result.data.fetchProducts));
    } catch (error) {
        yield put(fetchProducts.failure(error as Error));
    }
}

export function* deleteProductAsync({ payload }: deleteProductRequestType) {
    try {
        const result: ApolloQueryResult<{ deleteProduct: ProductDelete }> =
            yield call(apolloClient({}).mutate, {
                mutation: gql`
                    mutation deleteProduct($input: String!) {
                        deleteProduct(input: $input) {
                            status
                        }
                    }
                `,
                variables: {
                    input: payload,
                },
            });

        yield put(deleteProduct.success(result.data.deleteProduct.status));
    } catch (error) {
        yield put(deleteProduct.failure(error as Error));
    }
}

export function* updateProductAsync({ payload }: updateProductRequestType) {
    try {
        const result: ApolloQueryResult<{ updateProduct: Product }> =
            yield call(apolloClient({}).mutate, {
                mutation: gql`
                    mutation updateProduct(
                        $id: String!
                        $input: CreateProductInput!
                    ) {
                        updateProduct(id: $id, input: $input) {
                            id
                            name
                            image
                            description
                            price
                            inventory
                        }
                    }
                `,
                variables: {
                    id: payload.id,
                    input: {
                        name: payload.name,
                        image: payload.image,
                        description: payload.description,
                        price: payload.price,
                        inventory: payload.inventory,
                    },
                },
            });

        yield put(updateProduct.success(result.data.updateProduct));
    } catch (error) {
        yield put(updateProduct.failure(error as Error));
    }
}

export function* onCreateProduct() {
    yield takeLatest(
        PRODUCTS_ACTION_TYPES.CREATE_PRODUCT_START,
        createProductAsync
    );
}

export function* onFetchProductById() {
    yield takeLatest(
        PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_BY_ID_START,
        fetchProductByIdAsync
    );
}

export function* onFetchProducts() {
    yield takeLatest(
        PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START,
        fetchProductsAsync
    );
}

export function* onDeleteProduct() {
    yield takeLatest(
        PRODUCTS_ACTION_TYPES.DELETE_PRODUCT_START,
        deleteProductAsync
    );
}

export function* onUpdateProduct() {
    yield takeLatest(
        PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_START,
        updateProductAsync
    );
}

export function* productsSaga() {
    yield all([
        call(onFetchProducts),
        call(onFetchProductById),
        call(onCreateProduct),
        call(onDeleteProduct),
        call(onUpdateProduct),
    ]);
}
