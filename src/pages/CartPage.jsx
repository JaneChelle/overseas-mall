import { Link } from 'react-router-dom';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';

function CartPage() {
    const { cart, updateQuantity, removeItem } = useCart();

    if (cart.items.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex flex-col items-center justify-center">
                    <div className="w-32 h-32 bg-surface-elevated rounded-full flex items-center justify-center mb-6">
                        <span className="text-6xl">🛒</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">Your cart is empty</h1>
                    <p className="text-gray-400 mb-8 text-center max-w-md">
                        Looks like you haven't added anything to your cart yet. Start shopping to
                        fill it up!
                    </p>
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-accent-primary text-surface-deep font-bold px-8 py-4 rounded-full hover:bg-accent-secondary transition-colors"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-primary mb-6 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Continue Shopping
            </Link>

            <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="space-y-4">
                        {cart.items.map(item => (
                            <CartItem
                                key={item.productId}
                                item={item}
                                onUpdateQuantity={updateQuantity}
                                onRemove={removeItem}
                            />
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <CartSummary cart={cart} />
                </div>
            </div>
        </div>
    );
}

export default CartPage;
