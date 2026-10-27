import { useState, useMemo, useEffect } from 'react';
import { products, categories, brands, priceRanges, ratingOptions } from '../data/products';
import { useSearch } from '../contexts/SearchContext';
import ProductGrid from '../components/Product/ProductGrid';
import FilterSidebar from '../components/Product/FilterSidebar';
import SearchBar from '../components/Product/SearchBar';
import SortDropdown from '../components/Product/SortDropdown';

function HomePage() {
    const { globalSearchQuery, setGlobalSearchQuery } = useSearch();
    const [sortBy, setSortBy] = useState('featured');
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        priceRange: null,
        minRating: null,
    });

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value,
        }));
    };

    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        if (globalSearchQuery) {
            const query = globalSearchQuery.toLowerCase();
            result = result.filter(
                product =>
                    product.name.toLowerCase().includes(query) ||
                    product.brand.toLowerCase().includes(query) ||
                    product.category.toLowerCase().includes(query) ||
                    product.description.toLowerCase().includes(query)
            );
        }

        if (filters.categories.length > 0) {
            result = result.filter(product => filters.categories.includes(product.category));
        }

        if (filters.brands.length > 0) {
            result = result.filter(product => filters.brands.includes(product.brand));
        }

        if (filters.priceRange) {
            result = result.filter(
                product =>
                    product.price >= filters.priceRange.min &&
                    product.price <= filters.priceRange.max
            );
        }

        if (filters.minRating) {
            result = result.filter(product => product.rating >= filters.minRating);
        }

        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                result.reverse();
                break;
            default:
                break;
        }

        return result;
    }, [products, globalSearchQuery, filters, sortBy]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-6">Shop All Products</h1>

                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                    <div className="flex-1">
                        <SearchBar
                            value={globalSearchQuery}
                            onChange={setGlobalSearchQuery}
                            placeholder="Search by name, brand, or category..."
                        />
                    </div>
                    <SortDropdown value={sortBy} onChange={setSortBy} />
                </div>

                <div className="text-gray-400">
                    Showing {filteredAndSortedProducts.length} of {products.length} products
                </div>
            </div>

            <div className="flex gap-8">
                <FilterSidebar
                    categories={categories}
                    brands={brands}
                    priceRanges={priceRanges}
                    ratingOptions={ratingOptions}
                    activeFilters={filters}
                    onFilterChange={handleFilterChange}
                />

                <div className="flex-1">
                    <ProductGrid products={filteredAndSortedProducts} />
                </div>
            </div>
        </div>
    );
}

export default HomePage;
