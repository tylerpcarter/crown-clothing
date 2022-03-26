import { createContext, useState, useEffect } from "react";

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
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    //CartCount
    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    //CartTotal
    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0)
        setCartTotal(newCartTotal);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const removeItemFromCart = (cartItemToRemove) => {
        setCartItems(removeCartItem(cartItems, cartItemToRemove));
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
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