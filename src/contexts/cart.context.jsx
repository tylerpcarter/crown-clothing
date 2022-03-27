import { createContext, useReducer } from "react";

import { createAction } from "../utils/reducer/reducer.utils";

//helper function to find existing items in cart with matching id.
const addCartItem = (cartItems, productToAdd) => {
    //find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => cartItem.id == productToAdd.id);
    //if we find that, increment quantity value
    //if we find a match, return new array of cart items. 
    //return new cart item if a match. if id doesnt match,just return cartitem.
    if (existingCartItem) {
        return cartItems.map((cartItem) => cartItem.id == productToAdd.id ? 
        {...cartItem, quantity: cartItem.quantity + 1}
        : cartItem
        )
    }
    //return new array with modified cart items or any new items
    return [...cartItems, {...productToAdd, quantity: 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find cart item to remove inside the array
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id == cartItemToRemove.id
    );

    //check if quantity = 1. if it is, remove the item entirely from cart
    if (existingCartItem.quantity == 1) {
        return cartItems.filter(cartItem => cartItem.id != cartItemToRemove.id);
    }

    //if quantity isnt 1, return back cart items with matching cart item with reduced quantity
    return cartItems.map((cartItem) => cartItem.id == cartItemToRemove.id ? 
        {...cartItem, quantity: cartItem.quantity - 1}
        : cartItem
    )

}

const clearCartItem = (cartItems, cartItemToClear) => {
    //if cart item we're clearing out is equal to the cart item there, filter completely
    return cartItems.filter(cartItem => cartItem.id != cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0
});

const CART_ACTION_TYPES = {
    SET_CART_ITEMS: 'SET_CART_ITEMS',
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};

const cartReducer = (state, action) => {
    const {type, payload} = action;

    switch(type) {
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return {
                ...state,
                isCartOpen: payload,
            }

        default:
            throw new Error(`Unhandled type of ${type} in cartReducer.`)
    }
}

export const CartProvider = ({children}) => {
    const [ { cartItems, cartCount, cartTotal, isCartOpen }, dispatch ] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        //newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)

        //newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)

        dispatch(
            createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }));
    }
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems, cartItemToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {
        isCartOpen, 
        setIsCartOpen,
        addItemToCart,
        clearItemFromCart,
        removeItemFromCart,
        cartItems, 
        cartCount,
        cartTotal};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};