import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { products } from '../data/products';
import { useCart } from '../contexts/CartContext';

function ProductDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addItem, getItemQuantity } = useCart();
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [showAddedMessage, setShowAddedMessage] = useState(false);

    const product = products.find(p => p.id === id);

    if (!product) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                <h1 className="text-3xl font-bold text-white mb-4">Product not found</h1>
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-accent-primary hover:underline"
                >
                    <ArrowLeftIcon className="w-5 h-5" />
                    Back to shop
                </Link>
            </div>
        );
    }

    const renderStars = rating => {
        const stars = [];
        const fullStars = Math.floor(rating);

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(<StarIcon key={i} className="w-5 h-5 text-yellow-400" />);
            } else {
                stars.push(<StarOutlineIcon key={i} className="w-5 h-5 text-gray-500" />);
            }
        }

        return stars;
    };

    const handleAddToCart = () => {
        addItem(product, quantity);
        setShowAddedMessage(true);
        setTimeout(() => setShowAddedMessage(false), 2000);
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    const currentCartQuantity = getItemQuantity(product.id);
    const availableStock = product.stockCount - currentCartQuantity;
    const maxQuantity = Math.min(availableStock, 10);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Link
                to="/"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-accent-primary mb-6 transition-colors"
            >
                <ArrowLeftIcon className="w-5 h-5" />
                Back to shop
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                <div>
                    <div className="bg-surface-elevated rounded-2xl overflow-hidden mb-4">
                        <div className="aspect-square bg-surface-raised">
                            <img
                                src={product.images[selectedImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {product.images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImage(index)}
                                className={`aspect-square bg-surface-elevated rounded-xl overflow-hidden ${
                                    selectedImage === index
                                        ? 'ring-2 ring-accent-primary'
                                        : 'hover:ring-2 hover:ring-surface-overlay'
                                } transition-all`}
                            >
                                <img
                                    src={image}
                                    alt={`${product.name} ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <div className="text-sm text-accent-secondary mb-2">{product.brand}</div>
                    <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                        {product.name}
                    </h1>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex">{renderStars(product.rating)}</div>
                        <span className="text-gray-400">
                            {product.rating} ({product.reviewCount} reviews)
                        </span>
                    </div>

                    <div className="flex items-baseline gap-3 mb-6">
                        <span className="text-4xl font-bold text-accent-primary">
                            ${product.price.toFixed(2)}
                        </span>
                        {hasDiscount && (
                            <>
                                <span className="text-xl text-gray-500 line-through">
                                    ${product.originalPrice.toFixed(2)}
                                </span>
                                <span className="bg-accent-primary text-surface-deep px-3 py-1 rounded-full text-sm font-bold">
                                    Save {discountPercentage}%
                                </span>
                            </>
                        )}
                    </div>

                    <div className="border-t border-surface-overlay pt-6 mb-6">
                        <p className="text-gray-300 leading-relaxed mb-6">{product.description}</p>

                        {product.features && product.features.length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-white font-semibold mb-3">Key Features</h3>
                                <ul className="space-y-2">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start gap-2 text-gray-300">
                                            <span className="text-accent-primary mt-1">•</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="border-t border-surface-overlay pt-6">
                        {product.inStock ? (
                            <>
                                <div className="flex items-center gap-4 mb-6">
                                    <div>
                                        <label className="text-sm text-gray-400 block mb-2">
                                            Quantity
                                        </label>
                                        <select
                                            value={quantity}
                                            onChange={e => setQuantity(Number(e.target.value))}
                                            className="bg-surface-elevated border border-surface-overlay rounded-full px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-accent-primary"
                                        >
                                            {[...Array(maxQuantity)].map((_, i) => (
                                                <option key={i + 1} value={i + 1}>
                                                    {i + 1}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <div className="text-sm text-gray-400 mb-2">
                                            Stock available
                                        </div>
                                        <div className="text-white font-semibold">
                                            {availableStock} units
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={availableStock === 0}
                                    className="w-full bg-accent-primary text-surface-deep font-bold py-4 rounded-full hover:bg-accent-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {availableStock === 0 ? 'Out of Stock' : 'Add to Cart'}
                                </button>

                                {showAddedMessage && (
                                    <div className="mt-4 bg-accent-secondary/20 border border-accent-secondary text-accent-secondary px-4 py-3 rounded-xl text-center">
                                        Added to cart successfully!
                                    </div>
                                )}

                                {currentCartQuantity > 0 && (
                                    <div className="mt-4 text-sm text-gray-400 text-center">
                                        {currentCartQuantity} already in cart
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="bg-surface-elevated border border-surface-overlay rounded-xl p-6 text-center">
                                <div className="text-white font-bold mb-2">Out of Stock</div>
                                <div className="text-gray-400 text-sm">
                                    This item is currently unavailable
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;
