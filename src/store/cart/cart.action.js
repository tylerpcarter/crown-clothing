import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";


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



export const setIsCartOpen = (bool) => 
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);


export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}

export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
}