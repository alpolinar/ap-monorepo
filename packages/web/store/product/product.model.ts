import { ActionType, createAsyncAction, getType } from "typesafe-actions";
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

export type fetchProductsRequestType = ActionType<typeof fetchProducts.request>;
export type fetchProductByIdRequestType = ActionType<
    typeof fetchProductById.request
>;
export type createProductRequestType = ActionType<typeof createProduct.request>;

export const productActions = {
    fetchProducts,
    fetchProductById,
    createProduct,
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
}

export const PRODUCTS_INITIAL_STATE: IModel = {
    product: { item: null, isLoading: false, error: null },
    products: { items: [], isLoading: false, error: null },
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
        default:
            return state;
    }
};
