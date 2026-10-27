import ProductCard from './ProductCard';

function ProductGrid({ products }) {
    if (products.length === 0) {
        return (
            <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className="w-24 h-24 bg-surface-elevated rounded-full flex items-center justify-center mb-4">
                    <span className="text-4xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">No products found</h3>
                <p className="text-gray-400">Try adjusting your filters or search criteria</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}

export default ProductGrid;
