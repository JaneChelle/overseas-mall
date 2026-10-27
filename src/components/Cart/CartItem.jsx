import { Link } from 'react-router-dom';
import { TrashIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';

function CartItem({ item, onUpdateQuantity, onRemove }) {
    const { product, quantity } = item;
    const subtotal = product.price * quantity;

    const handleDecrease = () => {
        if (quantity > 1) {
            onUpdateQuantity(product.id, quantity - 1);
        }
    };

    const handleIncrease = () => {
        if (quantity < product.stockCount) {
            onUpdateQuantity(product.id, quantity + 1);
        }
    };

    return (
        <div className="bg-surface-elevated rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row gap-4">
            <Link
                to={`/product/${product.id}`}
                className="w-full sm:w-32 h-32 bg-surface-raised rounded-xl overflow-hidden flex-shrink-0 hover:ring-2 hover:ring-accent-primary transition-all"
            >
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover"
                />
            </Link>

            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <Link
                        to={`/product/${product.id}`}
                        className="text-white font-semibold hover:text-accent-primary transition-colors mb-1 block"
                    >
                        {product.name}
                    </Link>
                    <div className="text-sm text-gray-400 mb-2">{product.brand}</div>
                    <div className="text-accent-primary font-bold text-lg">
                        ${product.price.toFixed(2)}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleDecrease}
                            disabled={quantity <= 1}
                            className="w-8 h-8 bg-surface-raised rounded-full flex items-center justify-center hover:bg-surface-overlay transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MinusIcon className="w-4 h-4 text-white" />
                        </button>
                        <span className="text-white font-semibold w-8 text-center">{quantity}</span>
                        <button
                            onClick={handleIncrease}
                            disabled={quantity >= product.stockCount}
                            className="w-8 h-8 bg-surface-raised rounded-full flex items-center justify-center hover:bg-surface-overlay transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <PlusIcon className="w-4 h-4 text-white" />
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-white font-bold text-lg">
                            ${subtotal.toFixed(2)}
                        </div>
                        <button
                            onClick={() => onRemove(product.id)}
                            className="p-2 hover:bg-surface-raised rounded-full transition-colors group"
                        >
                            <TrashIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                        </button>
                    </div>
                </div>

                {quantity >= product.stockCount && (
                    <div className="mt-2 text-xs text-yellow-400">
                        Maximum stock reached
                    </div>
                )}
            </div>
        </div>
    );
}

export default CartItem;
