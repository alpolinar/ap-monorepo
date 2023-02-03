import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Orders, actions, ordersReducer } from "./orders.model";
import { RootState } from "../store";

const setOrders = (orders: Orders[], products: Orders[]): Orders[] => {
    return [...orders, ...products];
};

const selectOrdersReducer = (state: RootState) => state.orders;

const selectOrders = createSelector(
    [selectOrdersReducer],
    (order) => order.orders
);

export const useOrders = () => {
    const dispatch = useDispatch();
    const orders = useSelector(selectOrders);

    function setUserOrders(orders: Orders[], products: Orders[]) {
        const newOrder = setOrders(orders, products);
        dispatch(actions.setOrders(newOrder));
    }

    return {
        orders,
        setUserOrders,
    };
};
