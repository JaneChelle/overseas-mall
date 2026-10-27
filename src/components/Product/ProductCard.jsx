import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarOutlineIcon } from '@heroicons/react/24/outline';

function ProductCard({ product }) {
    const renderStars = rating => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <StarIcon key={i} className="w-4 h-4 text-yellow-400" />
                );
            } else {
                stars.push(
                    <StarOutlineIcon key={i} className="w-4 h-4 text-gray-500" />
                );
            }
        }

        return stars;
    };

    const hasDiscount = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = hasDiscount
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Link
            to={`/product/${product.id}`}
            className="group bg-surface-elevated rounded-2xl overflow-hidden hover:ring-2 hover:ring-accent-primary transition-all duration-300"
        >
            <div className="aspect-square bg-surface-raised relative overflow-hidden">
                <img
                    src={product.thumbnail}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {hasDiscount && (
                    <div className="absolute top-3 right-3 bg-accent-primary text-surface-deep px-3 py-1 rounded-full text-sm font-bold">
                        -{discountPercentage}%
                    </div>
                )}
                {!product.inStock && (
                    <div className="absolute inset-0 bg-surface-deep/80 flex items-center justify-center">
                        <span className="text-white font-bold text-lg">Out of Stock</span>
                    </div>
                )}
            </div>

            <div className="p-4">
                <div className="text-sm text-gray-400 mb-1">{product.brand}</div>
                <h3 className="text-white font-semibold mb-2 line-clamp-2 group-hover:text-accent-primary transition-colors">
                    {product.name}
                </h3>

                <div className="flex items-center gap-1 mb-3">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="text-sm text-gray-400">({product.reviewCount})</span>
                </div>

                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-accent-primary">
                        ${product.price.toFixed(2)}
                    </span>
                    {hasDiscount && (
                        <span className="text-sm text-gray-500 line-through">
                            ${product.originalPrice.toFixed(2)}
                        </span>
                    )}
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;
