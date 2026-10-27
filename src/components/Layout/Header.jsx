import { ShoppingCartIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useSearch } from '../../contexts/SearchContext';
import { useEffect, useState } from 'react';

function Header() {
    const { cart } = useCart();
    const { globalSearchQuery, setGlobalSearchQuery } = useSearch();
    const [localQuery, setLocalQuery] = useState(globalSearchQuery);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setLocalQuery(globalSearchQuery);
    }, [globalSearchQuery]);

    const handleSearch = (e) => {
        e.preventDefault();
        setGlobalSearchQuery(localQuery);
        if (location.pathname !== '/') {
            navigate('/');
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocalQuery(value);
        if (location.pathname === '/') {
            setGlobalSearchQuery(value);
        }
    };

    return (
        <header className="bg-surface-elevated border-b border-surface-overlay sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link to="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-accent-primary rounded-full flex items-center justify-center">
                            <span className="text-surface-deep font-bold text-lg">O</span>
                        </div>
                        <span className="text-xl font-bold text-white hidden sm:inline">
                            Overseas Mall
                        </span>
                    </Link>

                    <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4 sm:mx-8 hidden md:block">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={localQuery}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 pl-10 bg-surface-raised border border-surface-overlay rounded-full text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent-primary"
                            />
                            <button
                                type="submit"
                                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                            >
                                <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 hover:text-accent-primary transition-colors" />
                            </button>
                        </div>
                    </form>

                    <Link
                        to="/cart"
                        className="relative p-2 hover:bg-surface-raised rounded-full transition-colors"
                    >
                        <ShoppingCartIcon className="w-6 h-6 text-white" />
                        {cart.totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 bg-accent-primary text-surface-deep text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                                {cart.totalItems}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;
