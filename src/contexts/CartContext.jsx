import { createContext, useContext, useReducer, useEffect } from 'react';
import {
    loadCartFromStorage,
    saveCartToStorage,
    calculateCartTotals,
    findCartItem,
} from '../utils/cartUtils';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
    let newItems;
    let newState;

    switch (action.type) {
        case 'ADD_ITEM': {
            const existingItem = findCartItem(state.items, action.payload.product.id);

            if (existingItem) {
                const maxQuantity = action.payload.product.stockCount;
                const newQuantity = Math.min(
                    existingItem.quantity + action.payload.quantity,
                    maxQuantity
                );

                newItems = state.items.map(item =>
                    item.productId === action.payload.product.id
                        ? { ...item, quantity: newQuantity }
                        : item
                );
            } else {
                const newItem = {
                    productId: action.payload.product.id,
                    product: action.payload.product,
                    quantity: action.payload.quantity,
                    addedAt: Date.now(),
                };
                newItems = [...state.items, newItem];
            }

            const totals = calculateCartTotals(newItems);
            newState = { items: newItems, ...totals };
            return newState;
        }

        case 'REMOVE_ITEM':
            newItems = state.items.filter(item => item.productId !== action.payload.productId);
            return { items: newItems, ...calculateCartTotals(newItems) };

        case 'UPDATE_QUANTITY': {
            const item = findCartItem(state.items, action.payload.productId);
            if (!item) {
                return state;
            }

            const maxQuantity = item.product.stockCount;
            const newQuantity = Math.max(1, Math.min(action.payload.quantity, maxQuantity));

            newItems = state.items.map(cartItem =>
                cartItem.productId === action.payload.productId
                    ? { ...cartItem, quantity: newQuantity }
                    : cartItem
            );

            return { items: newItems, ...calculateCartTotals(newItems) };
        }

        case 'CLEAR_CART':
            return { items: [], totalItems: 0, totalPrice: 0 };

        case 'LOAD_CART':
            return action.payload;

        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, { items: [], totalItems: 0, totalPrice: 0 });

    useEffect(() => {
        const savedCart = loadCartFromStorage();
        dispatch({ type: 'LOAD_CART', payload: savedCart });
    }, []);

    useEffect(() => {
        if (cart.items.length > 0 || cart.totalItems > 0) {
            saveCartToStorage(cart);
        }
    }, [cart]);

    const addItem = (product, quantity = 1) => {
        dispatch({ type: 'ADD_ITEM', payload: { product, quantity } });
    };

    const removeItem = productId => {
        dispatch({ type: 'REMOVE_ITEM', payload: { productId } });
    };

    const updateQuantity = (productId, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };

    const getItemQuantity = productId => {
        const item = findCartItem(cart.items, productId);
        return item ? item.quantity : 0;
    };

    const value = {
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};
