import { ActionType, createAction, getType } from "typesafe-actions";

export enum ORDERS_ACTION_TYPES {
    GET_ORDERS = "orders/GET_ORDERS",
}

export type Orders = {
    id: string;
    user_id: string;
    products: string;
};

export const setOrders = createAction(ORDERS_ACTION_TYPES.GET_ORDERS)<
    Orders[]
>();

export const actions = {
    setOrders,
};

export interface IModel {
    readonly orders: Orders[];
}

export const ORDERS_INITIAL_STATE: IModel = {
    orders: [],
};

export const ordersReducer = (
    state: IModel = ORDERS_INITIAL_STATE,
    action: ActionType<typeof actions>
): IModel => {
    switch (action.type) {
        case getType(setOrders):
            return { ...state, orders: action.payload };
        default:
            return state;
    }
};
