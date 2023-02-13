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
} from "./product.model";
import { Product } from "@ap-monorepo/api/src/graphql";
import { apolloClient } from "../../services/apolloClient";

export function* createProductAsync({ payload }: createProductRequestType) {
    try {
        const result: ApolloQueryResult<{ createProduct: Product }> =
            yield call(apolloClient({}).mutate, {
                mutation: gql`
                    mutation createProduct($input: CreateProductInput!) {
                        createProduct(input: $input) {
                            name
                            description
                            price
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
                            description
                            price
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

export function* fetchProductsAsync({ payload }: fetchProductsRequestType) {
    try {
        const result: ApolloQueryResult<{ fetchProducts: Product[] }> =
            yield call(apolloClient({}).query, {
                query: gql`
                    query fetchProducts {
                        fetchProducts {
                            id
                            name
                            description
                            price
                        }
                    }
                `,
            });

        yield put(fetchProducts.success(result.data.fetchProducts));
    } catch (error) {
        yield put(fetchProducts.failure(error as Error));
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

export function* productsSaga() {
    yield all([
        call(onFetchProducts),
        call(onFetchProductById),
        call(onCreateProduct),
    ]);
}
