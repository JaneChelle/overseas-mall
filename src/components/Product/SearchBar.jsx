import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
    return (
        <div className="relative w-full">
            <input
                type="text"
                value={value}
                onChange={e => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-4 py-3 pl-11 bg-surface-elevated border border-surface-overlay rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-primary transition-all"
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        </div>
    );
}

export default SearchBar;
