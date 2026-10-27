function CartSummary({ cart }) {
    const { totalItems, totalPrice } = cart;

    const shipping = totalPrice > 50 ? 0 : 5.99;
    const tax = totalPrice * 0.1;
    const total = totalPrice + shipping + tax;

    return (
        <div className="bg-surface-elevated rounded-2xl p-6 sticky top-24">
            <h2 className="text-xl font-bold text-white mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-300">
                    <span>Subtotal ({totalItems} items)</span>
                    <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-gray-300">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                </div>
            </div>

            {totalPrice < 50 && totalPrice > 0 && (
                <div className="bg-accent-secondary/10 border border-accent-secondary/30 text-accent-secondary text-sm px-4 py-3 rounded-xl mb-6">
                    Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </div>
            )}

            <div className="border-t border-surface-overlay pt-4 mb-6">
                <div className="flex justify-between text-white font-bold text-xl">
                    <span>Total</span>
                    <span className="text-accent-primary">${total.toFixed(2)}</span>
                </div>
            </div>

            <button className="w-full bg-accent-primary text-surface-deep font-bold py-4 rounded-full hover:bg-accent-secondary transition-colors">
                Proceed to Checkout
            </button>

            <div className="mt-4 text-center text-sm text-gray-400">
                Secure checkout powered by Stripe
            </div>
        </div>
    );
}

export default CartSummary;
