const CART_STORAGE_KEY = 'overseas-mall-cart';

export const loadCartFromStorage = () => {
    try {
        const cartData = localStorage.getItem(CART_STORAGE_KEY);
        if (cartData) {
            return JSON.parse(cartData);
        }
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
    }
    return { items: [], totalItems: 0, totalPrice: 0 };
};

export const saveCartToStorage = cart => {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
};

export const calculateCartTotals = items => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { totalItems, totalPrice };
};

export const findCartItem = (items, productId) => {
    return items.find(item => item.productId === productId);
};

export const clearCartStorage = () => {
    try {
        localStorage.removeItem(CART_STORAGE_KEY);
    } catch (error) {
        console.error('Failed to clear cart from localStorage:', error);
    }
};
