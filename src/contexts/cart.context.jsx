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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems, cartCount};

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    )
};