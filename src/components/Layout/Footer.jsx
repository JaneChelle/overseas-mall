function Footer() {
    return (
        <footer className="bg-surface-elevated border-t border-surface-overlay mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h3 className="text-white font-bold mb-4">Overseas Mall</h3>
                        <p className="text-gray-400 text-sm">
                            Your trusted source for quality products worldwide.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Shop</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    All Products
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    New Arrivals
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Best Sellers
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Support</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    FAQs
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Shipping Info
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-semibold mb-4">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-accent-primary transition-colors">
                                    Returns
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-surface-overlay text-center text-sm text-gray-400">
                    <p>&copy; 2026 Overseas Mall. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
