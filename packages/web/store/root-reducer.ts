import { combineReducers } from "redux";

import { authenticationReducer } from "./authentication/authentication.model";
import { cartReducer } from "./cart/cart.model";
import { ordersReducer } from "./orders/orders.model";
import { productsReducer } from "./product/product.model";

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
    cart: cartReducer,
    orders: ordersReducer,
    product: productsReducer,
});
