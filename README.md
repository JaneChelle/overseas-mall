# Overseas Mall

A modern e-commerce application built with React, designed for international consumers. Browse products, search and filter inventory, and manage your shopping cart with a seamless experience across desktop and mobile devices.

![Overseas Mall](https://via.placeholder.com/1200x600/0F131C/38BDF8?text=Overseas+Mall)

## ✨ Features

- **Product Browsing**: Grid-based product display with responsive layouts
- **Advanced Search**: Real-time search across product names, brands, categories, and descriptions
- **Smart Filtering**: Filter by categories, price ranges, brands, and ratings
- **Flexible Sorting**: Sort products by price, rating, or newest arrivals
- **Product Details**: Comprehensive product pages with image galleries and detailed information
- **Shopping Cart**: Full cart management with quantity adjustment and persistent storage
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Modern dark UI with accent colors for better visual hierarchy

## 🚀 Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Headless UI
- **Icons**: Heroicons
- **State Management**: React Context API + useReducer
- **Storage**: localStorage for cart persistence

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd overseas-mall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

4. **Build for production**
   ```bash
   npm run build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── Cart/
│   │   ├── CartItem.jsx          # Individual cart item component
│   │   └── CartSummary.jsx       # Order summary panel
│   ├── Layout/
│   │   ├── Header.jsx            # Top navigation bar
│   │   ├── Footer.jsx            # Site footer
│   │   └── Layout.jsx            # Main layout wrapper
│   └── Product/
│       ├── FilterSidebar.jsx     # Product filtering sidebar
│       ├── ProductCard.jsx       # Product card for grid
│       ├── ProductGrid.jsx       # Product grid container
│       ├── SearchBar.jsx         # Search input component
│       └── SortDropdown.jsx      # Sort options dropdown
├── contexts/
│   └── CartContext.jsx           # Global cart state management
├── data/
│   └── mockData.js              # Mock product data (20 products)
├── pages/
│   ├── CartPage.jsx             # Shopping cart page
│   ├── HomePage.jsx             # Product listing page
│   └── ProductDetailPage.jsx    # Product detail page
├── utils/
│   └── cartUtils.js             # Cart helper functions
├── App.jsx                      # Main app component with routing
├── main.jsx                     # Application entry point
└── index.css                    # Global styles and Tailwind imports
```

## 🎨 Design System

The application uses a custom dark theme inspired by modern e-commerce platforms:

- **Color Palette**:
  - Surface levels: `#05070C`, `#0A0D12`, `#0F131C`, `#161D2B`, `#1E2636`
  - Primary accent: `#38BDF8` (bright blue)
  - Secondary accent: `#6EE7B7` (soft green)

- **Typography**: Fluid scaling using `clamp()` for responsive text sizes

- **Layout**: CSS Grid-first approach with Flexbox for component internals

- **Border Radius**: Fully rounded design (`rounded-full` for buttons, `rounded-2xl` for cards)

## 🛒 Features Deep Dive

### Product Browsing
- Grid layout automatically adjusts columns based on screen size (1-4 columns)
- Product cards display thumbnail, brand, name, rating, price, and discount badges
- Out-of-stock items are visually indicated

### Search & Filter
- **Search**: Real-time filtering across multiple product fields
- **Categories**: Multi-select category filtering
- **Price Range**: Radio button price range selection
- **Brands**: Multi-select brand filtering
- **Rating**: Minimum rating filter
- Mobile-friendly drawer for filters on smaller screens

### Shopping Cart
- **Add to Cart**: One-click add from product detail page
- **Quantity Management**: Increase/decrease with stock limit enforcement
- **Remove Items**: Individual item removal
- **Persistent Storage**: Cart saved to localStorage
- **Cart Badge**: Live count in header navigation
- **Order Summary**: Subtotal, shipping, tax, and total calculations
- **Free Shipping**: Promotional threshold at $50

### Responsive Design
- **Desktop (≥1024px)**: Fixed sidebar filters, 3-4 column product grid
- **Tablet (768px-1023px)**: Collapsible filters, 2-3 column grid
- **Mobile (<768px)**: Drawer-style filters, 1-2 column grid, floating filter button

## 🔧 Configuration

### Mock Data
Product data is defined in `src/data/mockData.js`. To customize:

1. Edit the `products` array to add/modify products
2. Update `categories`, `brands`, `priceRanges`, and `ratingOptions` as needed
3. Replace placeholder images with actual product images

### Tailwind Theme
Custom colors and spacing are defined in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'surface-base': '#0A0D12',
      'surface-elevated': '#0F131C',
      // ... more custom colors
    }
  }
}
```

## 🚧 Future Enhancements

- [ ] User authentication
- [ ] Backend API integration
- [ ] Payment processing (Stripe integration)
- [ ] Order history
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Multi-language support
- [ ] Currency conversion

## 📄 License

This project is licensed under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using React and Tailwind CSS
# mall
# mall
# mall
