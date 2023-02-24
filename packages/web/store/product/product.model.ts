import {
    ActionType,
    createAction,
    createAsyncAction,
    getType,
} from "typesafe-actions";
import { CreateProductInput, Product } from "@ap-monorepo/api/src/graphql";

export enum PRODUCTS_ACTION_TYPES {
    FETCH_PRODUCTS_START = "product/FETCH_PRODUCTS_START",
    FETCH_PRODUCTS_SUCCESS = "product/FETCH_PRODUCTS_SUCCESS",
    FETCH_PRODUCTS_FAILED = "product/FETCH_PRODUCTS_FAILED",
    FETCH_PRODUCT_BY_ID_START = "product/FETCH_PRODUCT_BY_ID_START",
    FETCH_PRODUCT_BY_ID_SUCCESS = "product/FETCH_PRODUCT_BY_ID_SUCCESS",
    FETCH_PRODUCT_BY_ID_FAILED = "product/FETCH_PRODUCT_BY_ID_FAILED",
    CREATE_PRODUCT_START = "product/CREATE_PRODUCT_START",
    CREATE_PRODUCT_SUCCESS = "product/CREATE_PRODUCT_SUCCESS",
    CREATE_PRODUCT_FAILED = "product/CREATE_PRODUCT_FAILED",
    UPDATE_PRODUCT_START = "product/UPDATE_PRODUCT_START",
    UPDATE_PRODUCT_SUCCESS = "product/UPDATE_PRODUCT_SUCCESS",
    UPDATE_PRODUCT_FAILED = "product/UPDATE_PRODUCT_FAILED",
    DELETE_PRODUCT_START = "product/DELETE_PRODUCT_START",
    DELETE_PRODUCT_SUCCESS = "product/DELETE_PRODUCT_SUCCESS",
    DELETE_PRODUCT_FAILED = "product/DELETE_PRODUCT_FAILED",
    APPLY_SEARCH_FILTER = "product/APPLY_SEARCH_FILTER",
}

export const fetchProducts = createAsyncAction(
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_START,
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_SUCCESS,
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCTS_FAILED
)<void, Product[], Error>();

export const fetchProductById = createAsyncAction(
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_BY_ID_START,
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_BY_ID_SUCCESS,
    PRODUCTS_ACTION_TYPES.FETCH_PRODUCT_BY_ID_FAILED
)<string, Product | null, Error>();

export const createProduct = createAsyncAction(
    PRODUCTS_ACTION_TYPES.CREATE_PRODUCT_START,
    PRODUCTS_ACTION_TYPES.CREATE_PRODUCT_SUCCESS,
    PRODUCTS_ACTION_TYPES.CREATE_PRODUCT_FAILED
)<CreateProductInput, Product, Error>();

export const updateProduct = createAsyncAction(
    PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_START,
    PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_SUCCESS,
    PRODUCTS_ACTION_TYPES.UPDATE_PRODUCT_FAILED
)<Partial<Product>, Product, Error>();

export const deleteProduct = createAsyncAction(
    PRODUCTS_ACTION_TYPES.DELETE_PRODUCT_START,
    PRODUCTS_ACTION_TYPES.DELETE_PRODUCT_SUCCESS,
    PRODUCTS_ACTION_TYPES.DELETE_PRODUCT_FAILED
)<string, string, Error>();

export const applySearchFilter = createAction(
    PRODUCTS_ACTION_TYPES.APPLY_SEARCH_FILTER
)<string>();

export type fetchProductsRequestType = ActionType<typeof fetchProducts.request>;
export type fetchProductByIdRequestType = ActionType<
    typeof fetchProductById.request
>;
export type createProductRequestType = ActionType<typeof createProduct.request>;

export type updateProductRequestType = ActionType<typeof updateProduct.request>;

export type deleteProductRequestType = ActionType<typeof deleteProduct.request>;

export type applySearchFilterType = ActionType<typeof applySearchFilter>;

export const productActions = {
    fetchProducts,
    fetchProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    applySearchFilter,
};

export interface IModel {
    readonly product: {
        readonly item: Product | null;
        readonly isLoading: boolean;
        readonly error: Error | null;
    };
    readonly products: {
        readonly items: Product[];
        readonly isLoading: boolean;
        readonly error: Error | null;
    };
    readonly searchFilter: string;
    readonly deleteting: boolean;
}

export const PRODUCTS_INITIAL_STATE: IModel = {
    product: { item: null, isLoading: false, error: null },
    products: { items: [], isLoading: false, error: null },
    searchFilter: "",
    deleteting: false,
};

export const productsReducer = (
    state: IModel = PRODUCTS_INITIAL_STATE,
    action: ActionType<typeof productActions>
): IModel => {
    switch (action.type) {
        case getType(fetchProducts.request):
            return {
                ...state,
                products: { ...state.products, isLoading: true },
            };
        case getType(fetchProducts.success):
            return {
                ...state,
                products: {
                    ...state.products,
                    items: action.payload,
                    isLoading: false,
                },
            };
        case getType(fetchProducts.failure):
            return {
                ...state,
                products: {
                    ...state.products,
                    error: action.payload,
                    isLoading: false,
                },
            };

        case getType(fetchProductById.request):
            return { ...state, product: { ...state.product, isLoading: true } };
        case getType(fetchProductById.success):
            return {
                ...state,
                product: {
                    ...state.product,
                    item: action.payload,
                    isLoading: false,
                },
            };
        case getType(fetchProductById.failure):
            return {
                ...state,
                product: {
                    ...state.product,
                    error: action.payload,
                    isLoading: false,
                },
            };

        case getType(createProduct.request):
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoading: true,
                },
            };
        case getType(createProduct.success):
            return {
                ...state,
                product: {
                    ...state.product,
                    item: action.payload,
                    isLoading: false,
                },
            };
        case getType(createProduct.failure):
            return {
                ...state,
                product: {
                    ...state.product,
                    error: action.payload,
                    isLoading: false,
                },
            };
        case getType(updateProduct.request):
            return {
                ...state,
                product: {
                    ...state.product,
                    isLoading: true,
                },
            };
        case getType(updateProduct.success):
            return {
                ...state,
                product: {
                    ...state.product,
                    item: action.payload,
                    isLoading: false,
                },
            };
        case getType(updateProduct.failure):
            return {
                ...state,
                product: {
                    ...state.product,
                    error: action.payload,
                    isLoading: false,
                },
            };
        case getType(deleteProduct.request):
            return {
                ...state,
                deleteting: true,
            };
        case getType(deleteProduct.success):
            return {
                ...state,
                deleteting: false,
            };
        case getType(deleteProduct.failure):
            return {
                ...state,
                deleteting: false,
            };
        case getType(applySearchFilter):
            return { ...state, searchFilter: action.payload };
        default:
            return state;
    }
};
