import { ActionType, createAction, getType } from "typesafe-actions";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = "cart/SET_CART_ITEMS",
}

export type ProductItem = {
    id: string;
    name: string;
    image: string;
    price: number;
};

export type CartItem = ProductItem & {
    quantity: number;
};

export const setCartItems = createAction(CART_ACTION_TYPES.SET_CART_ITEMS)<
    CartItem[]
>();

export const actions = {
    setCartItems,
};

export interface IModel {
    readonly cartItems: CartItem[];
}

export const CART_INITIAL_STATE: IModel = {
    cartItems: [],
};

export const cartReducer = (
    state: IModel = CART_INITIAL_STATE,
    action: ActionType<typeof actions>
): IModel => {
    switch (action.type) {
        case getType(setCartItems):
            return { ...state, cartItems: action.payload };
        default:
            return state;
    }
};
