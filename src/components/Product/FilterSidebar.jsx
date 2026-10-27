import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

function FilterSidebar({
    categories,
    brands,
    priceRanges,
    ratingOptions,
    activeFilters,
    onFilterChange,
}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleCategoryChange = category => {
        const current = activeFilters.categories || [];
        const updated = current.includes(category)
            ? current.filter(c => c !== category)
            : [...current, category];
        onFilterChange('categories', updated);
    };

    const handleBrandChange = brand => {
        const current = activeFilters.brands || [];
        const updated = current.includes(brand)
            ? current.filter(b => b !== brand)
            : [...current, brand];
        onFilterChange('brands', updated);
    };

    const handlePriceChange = range => {
        onFilterChange('priceRange', range);
    };

    const handleRatingChange = rating => {
        onFilterChange('minRating', rating);
    };

    const clearAllFilters = () => {
        onFilterChange('categories', []);
        onFilterChange('brands', []);
        onFilterChange('priceRange', null);
        onFilterChange('minRating', null);
    };

    const hasActiveFilters =
        (activeFilters.categories && activeFilters.categories.length > 0) ||
        (activeFilters.brands && activeFilters.brands.length > 0) ||
        activeFilters.priceRange ||
        activeFilters.minRating;

    const FilterContent = () => (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Filters</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearAllFilters}
                        className="text-sm text-accent-primary hover:underline"
                    >
                        Clear all
                    </button>
                )}
            </div>

            <div>
                <h4 className="text-white font-semibold mb-3">Categories</h4>
                <div className="space-y-2">
                    {categories.map(category => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={activeFilters.categories?.includes(category) || false}
                                onChange={() => handleCategoryChange(category)}
                                className="w-4 h-4 rounded border-surface-overlay bg-surface-raised text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
                            />
                            <span className="text-gray-300 hover:text-white transition-colors">
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-3">Price Range</h4>
                <div className="space-y-2">
                    {priceRanges.map(range => (
                        <label key={range.label} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="priceRange"
                                checked={
                                    activeFilters.priceRange?.min === range.min &&
                                    activeFilters.priceRange?.max === range.max
                                }
                                onChange={() => handlePriceChange(range)}
                                className="w-4 h-4 border-surface-overlay bg-surface-raised text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
                            />
                            <span className="text-gray-300 hover:text-white transition-colors">
                                {range.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-3">Brand</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                    {brands.map(brand => (
                        <label key={brand} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={activeFilters.brands?.includes(brand) || false}
                                onChange={() => handleBrandChange(brand)}
                                className="w-4 h-4 rounded border-surface-overlay bg-surface-raised text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
                            />
                            <span className="text-gray-300 hover:text-white transition-colors">
                                {brand}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-3">Rating</h4>
                <div className="space-y-2">
                    {ratingOptions.map(option => (
                        <label key={option.value} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="radio"
                                name="rating"
                                checked={activeFilters.minRating === option.value}
                                onChange={() => handleRatingChange(option.value)}
                                className="w-4 h-4 border-surface-overlay bg-surface-raised text-accent-primary focus:ring-accent-primary focus:ring-offset-0"
                            />
                            <span className="text-gray-300 hover:text-white transition-colors">
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden fixed bottom-4 right-4 z-40 bg-accent-primary text-surface-deep px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-accent-secondary transition-colors"
            >
                Filters
            </button>

            <div className="hidden lg:block w-64 flex-shrink-0">
                <div className="sticky top-20 bg-surface-elevated rounded-2xl p-6">
                    <FilterContent />
                </div>
            </div>

            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    <div
                        className="absolute inset-0 bg-surface-deep/80"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="relative ml-auto w-full max-w-sm bg-surface-elevated h-full overflow-y-auto p-6">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 p-2 hover:bg-surface-raised rounded-full transition-colors"
                        >
                            <XMarkIcon className="w-6 h-6 text-white" />
                        </button>
                        <FilterContent />
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterSidebar;
