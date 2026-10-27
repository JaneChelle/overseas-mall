import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import { SearchProvider } from './contexts/SearchContext';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
    return (
        <CartProvider>
            <SearchProvider>
                <Router basename="/overseas-mall">
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<HomePage />} />
                            <Route path="product/:id" element={<ProductDetailPage />} />
                            <Route path="cart" element={<CartPage />} />
                        </Route>
                    </Routes>
                </Router>
            </SearchProvider>
        </CartProvider>
    );
}

export default App;
