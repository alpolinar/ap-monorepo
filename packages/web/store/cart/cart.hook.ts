import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { CartItem, ProductItem, actions } from "./cart.model";
import { RootState } from "../store";

const addCartItem = (
    cartItems: CartItem[],
    productToAdd: ProductItem
): CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );
    if (existingCartItem) {
        return cartItems.map((cartItem) =>
            cartItem.id === productToAdd.id
                ? { ...cartItem, quantity: cartItem.quantity + 1 }
                : cartItem
        );
    }
    return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (
    cartItems: CartItem[],
    cartItemToRemove: CartItem
): CartItem[] => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === cartItemToRemove.id
    );

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(
            (cartItem) => cartItem.id !== cartItemToRemove.id
        );
    }

    return cartItems.map((cartItem) =>
        cartItem.id === cartItemToRemove.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
    );
};

const clearCartItem = (
    cartItems: CartItem[],
    cartItemToClear: CartItem
): CartItem[] =>
    cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

const clearCart = (cartItems: CartItem[]): CartItem[] => (cartItems = []);

const selectCartReducer = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
    [selectCartReducer],
    (cart) => cart.cartItems
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
        (total: number, cartItem: CartItem) => total + cartItem.quantity,
        0
    )
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
    cartItems.reduce(
        (total: number, cartItem: CartItem) =>
            total + cartItem.quantity * cartItem.price,
        0
    )
);

export const useCart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const cartCount = useSelector(selectCartCount);
    const cartTotal = useSelector(selectCartTotal);

    function addItemToCart(cartItems: CartItem[], productToAdd: ProductItem) {
        const newCartItems = addCartItem(cartItems, productToAdd);
        dispatch(actions.setCartItems(newCartItems));
    }

    function removeItemFromCart(
        cartItems: CartItem[],
        cartItemToRemove: CartItem
    ) {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        dispatch(actions.setCartItems(newCartItems));
    }

    function clearItemFromCart(
        cartItems: CartItem[],
        cartItemToClear: CartItem
    ) {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        dispatch(actions.setCartItems(newCartItems));
    }

    function clearCartItems(cartItems: CartItem[]) {
        const cart = clearCart(cartItems);
        dispatch(actions.setCartItems(cart));
    }

    return {
        cartItems,
        cartCount,
        cartTotal,
        addItemToCart,
        removeItemFromCart,
        clearItemFromCart,
        clearCartItems,
    };
};
