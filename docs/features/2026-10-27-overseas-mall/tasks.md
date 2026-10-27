# 海外商品选购应用 实现任务

**设计文档：** `docs/features/2026-10-27-overseas-mall/design.md`

> **执行约定：** 完成每个任务后，将对应的 `- [ ]` 改为 `- [x]`，以便跨会话追踪进度。

## 任务概览

### 依赖关系

```
任务 1（项目初始化） → 任务 2（数据层）
任务 3（全局状态 CartContext）
任务 4（Layout 与路由）→ 任务 5（Product 模块）→ 任务 6（商品列表页）
任务 5 → 任务 7（商品详情页）
任务 3 + 任务 5 → 任务 8（购物车模块）→ 任务 9（购物车页面）
```

### 文件变更清单

| 操作 | 文件 | 职责 |
|------|------|------|
| 新建 | `package.json` | 项目依赖配置 |
| 新建 | `vite.config.js` | Vite 构建配置 |
| 新建 | `tailwind.config.js` | Tailwind CSS 配置 |
| 新建 | `postcss.config.js` | PostCSS 配置 |
| 新建 | `src/index.css` | 全局样式与 CSS 变量 |
| 新建 | `src/main.jsx` | 应用入口 |
| 新建 | `src/App.jsx` | 根组件与路由配置 |
| 新建 | `src/data/mockProducts.js` | Mock 商品数据 |
| 新建 | `src/contexts/CartContext.jsx` | 购物车全局状态 |
| 新建 | `src/utils/cartUtils.js` | localStorage 持久化工具 |
| 新建 | `src/components/Layout/Header.jsx` | 顶部导航栏 |
| 新建 | `src/components/Layout/Footer.jsx` | 底部信息栏 |
| 新建 | `src/components/Layout/Layout.jsx` | 页面布局容器 |
| 新建 | `src/components/Product/ProductCard.jsx` | 商品卡片组件 |
| 新建 | `src/components/Product/ProductGrid.jsx` | 商品网格容器 |
| 新建 | `src/components/Product/FilterSidebar.jsx` | 筛选侧边栏 |
| 新建 | `src/components/Product/SearchBar.jsx` | 搜索框组件 |
| 新建 | `src/components/Product/SortDropdown.jsx` | 排序下拉菜单 |
| 新建 | `src/components/Product/ProductDetail.jsx` | 商品详情组件 |
| 新建 | `src/components/Cart/CartIcon.jsx` | 购物车图标与徽章 |
| 新建 | `src/components/Cart/CartItem.jsx` | 购物车商品项 |
| 新建 | `src/components/Cart/CartSummary.jsx` | 购物车汇总 |
| 新建 | `src/pages/HomePage.jsx` | 商品列表页 |
| 新建 | `src/pages/ProductDetailPage.jsx` | 商品详情页 |
| 新建 | `src/pages/CartPage.jsx` | 购物车页面 |
| 新建 | `README.md` | 项目说明文档 |

---

## 一、基础设施

- [x] 任务 1: 项目初始化与依赖安装
- [x] 任务 2: Mock 数据准备
- [x] 任务 3: 购物车全局状态（CartContext）

### 任务 1: 项目初始化与依赖安装

**涉及文件：**
- 新建: `package.json`
- 新建: `vite.config.js`
- 新建: `tailwind.config.js`
- 新建: `postcss.config.js`
- 新建: `src/index.css`
- 新建: `src/main.jsx`
- 新建: `.eslintrc.cjs`
- 新建: `.prettierrc`
- 新建: `index.html`

**要求：**
1. 使用 `npm create vite@latest` 初始化 React 项目
2. 安装核心依赖：
   ```bash
   npm install react-router-dom
   npm install -D tailwindcss postcss autoprefixer
   npm install @headlessui/react @heroicons/react
   ```
3. 配置 Tailwind CSS，在 `tailwind.config.js` 中扩展：
   ```javascript
   theme: {
     extend: {
       colors: {
         'surface-deep': '#05070C',
         'surface-base': '#0A0D12',
         'surface-raised': '#0F131C',
         'surface-elevated': '#161D2B',
         'surface-overlay': '#1E2636',
         'accent-primary': '#38BDF8',
         'accent-muted': '#6EE7B7',
       }
     }
   }
   ```
4. 在 `src/index.css` 中定义 CSS 变量（字号、行高、字间距）
5. 配置 ESLint 和 Prettier（基础规则即可）
6. 在 `index.html` 中设置 `<title>` 为 "Overseas Mall"

**前置条件：**
- 无

**验收标准：**
- 运行 `npm run dev` 可启动开发服务器
- Tailwind CSS 生效（背景色、自定义颜色可用）
- 无 ESLint 错误

---

### 任务 2: Mock 数据准备

**涉及文件：**
- 新建: `src/data/mockProducts.js`

**要求：**
1. 创建 20-30 个商品对象，符合设计文档中的 `Product` 接口：
   ```javascript
   {
     id: string,
     name: string,
     brand: string,
     price: number,
     originalPrice: number (optional),
     currency: 'USD',
     images: string[],  // 3-5 张图片 URL
     thumbnail: string,
     category: string,  // Electronics, Clothing, Home, Beauty
     rating: number,    // 3.5 - 5.0
     reviewCount: number,
     description: string,  // 100-200 字描述
     features: string[],   // 3-5 个卖点
     inStock: boolean,
     stockCount: number
   }
   ```
2. 品类分布：Electronics (8), Clothing (7), Home (7), Beauty (8)
3. 价格分布：$10 - $500，覆盖所有筛选区间
4. 品牌分布：5-8 个虚构品牌（如 TechPro, StyleHub, HomeEssence, GlowLab）
5. 图片使用 Unsplash API 占位符：`https://source.unsplash.com/400x400/?{category}`
6. 导出为 `export const products = [...]`

**前置条件：**
- 无

**验收标准：**
- 数据文件可正常导入
- 至少 20 个商品
- 每个品类至少 5 个商品
- 价格覆盖 $0-$50, $50-$100, $100-$200, $200+ 各区间
- 评分覆盖 3+ 和 4+ 档位

---

### 任务 3: 购物车全局状态（CartContext）

**涉及文件：**
- 新建: `src/contexts/CartContext.jsx`
- 新建: `src/utils/cartUtils.js`

**要求：**

**`cartUtils.js`:**
```javascript
export const CART_STORAGE_KEY = 'overseas_mall_cart';

export const loadCartFromStorage = () => {
  // 从 localStorage 读取购物车，返回 { items: [], totalItems: 0, totalPrice: 0 }
  // 使用 try-catch 处理 JSON.parse 错误
};

export const saveCartToStorage = (cartState) => {
  // 保存购物车到 localStorage
  // 使用 try-catch 处理存储失败
};

export const calculateTotals = (items) => {
  // 计算 totalItems 和 totalPrice
  // totalItems = sum of item.quantity
  // totalPrice = sum of (item.product.price * item.quantity)
};
```

**`CartContext.jsx`:**
```javascript
const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // 检查商品是否已存在，存在则 quantity += 1，否则添加新项
      // 返回新 state 并调用 calculateTotals
    case 'REMOVE_FROM_CART':
      // 从 items 中过滤掉指定 productId
    case 'UPDATE_QUANTITY':
      // 更新指定商品的 quantity
    case 'CLEAR_CART':
      // 清空 items
    case 'LOAD_CART':
      // 从 localStorage 加载（初始化时使用）
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    // 组件挂载时从 localStorage 加载
    dispatch({ type: 'LOAD_CART' });
  }, []);

  useEffect(() => {
    // cart 变化时保存到 localStorage
    saveCartToStorage(cart);
  }, [cart]);

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
```

**前置条件：**
- 无

**验收标准：**
- `useCart()` 可在组件中调用
- 添加商品后 `cart.totalItems` 和 `cart.totalPrice` 正确
- 刷新页面后购物车数据保留
- localStorage 失败时不崩溃（降级为内存状态）

---

## 二、Layout 与路由

- [x] 任务 4: Layout 组件（Header + Footer + 路由配置）

### 任务 4: Layout 组件（Header + Footer + 路由配置）

**涉及文件：**
- 新建: `src/components/Layout/Header.jsx`
- 新建: `src/components/Layout/Footer.jsx`
- 新建: `src/components/Layout/Layout.jsx`
- 新建: `src/components/Cart/CartIcon.jsx`
- 新建: `src/App.jsx`
- 修改: `src/main.jsx`（包裹 CartProvider 和 BrowserRouter）

**要求：**

**`CartIcon.jsx`:**
```javascript
// Props: 无（从 useCart() 获取 totalItems）
// Display:
// - 购物车图标（使用 @heroicons/react 的 ShoppingCartIcon）
// - 红色圆形徽章显示 totalItems（仅当 > 0 时显示）
// - 点击跳转到 /cart
// - 样式: 相对定位，徽章绝对定位在右上角
```

**`Header.jsx`:**
```javascript
// Layout:
// - 背景色 bg-surface-elevated
// - 容器: max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
// - Flexbox: justify-between items-center h-16
// - 左侧: Logo 文字 "Overseas Mall"（链接到 /）
// - 中间: SearchBar 组件（Desktop 显示，Mobile 隐藏或折叠）
// - 右侧: CartIcon 组件
```

**`Footer.jsx`:**
```javascript
// Display:
// - 背景色 bg-surface-raised
// - 文本居中，文字颜色 text-gray-400
// - 内容: "© 2026 Overseas Mall. All rights reserved."
```

**`Layout.jsx`:**
```javascript
// Structure:
// <div className="min-h-screen bg-surface-base flex flex-col">
//   <Header />
//   <main className="flex-1">{children}</main>
//   <Footer />
// </div>
```

**`App.jsx`:**
```javascript
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
```

**`main.jsx`:**
```javascript
import { CartProvider } from './contexts/CartContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
```

**前置条件：**
- 任务 3（CartContext 已实现）

**验收标准：**
- Header 在所有页面显示
- Logo 点击可返回首页
- CartIcon 显示正确的商品数量徽章
- Footer 固定在页面底部
- 路由切换正常

---

## 三、Product 模块（组件）

- [x] 任务 5: Product 基础组件（ProductCard, ProductGrid, FilterSidebar, SearchBar, SortDropdown）

### 任务 5: Product 基础组件

**涉及文件：**
- 新建: `src/components/Product/ProductCard.jsx`
- 新建: `src/components/Product/ProductGrid.jsx`
- 新建: `src/components/Product/FilterSidebar.jsx`
- 新建: `src/components/Product/SearchBar.jsx`
- 新建: `src/components/Product/SortDropdown.jsx`

**要求：**

**`ProductCard.jsx`:**
```javascript
// Props: { product, onClick }
// Display:
// - 卡片容器: bg-surface-raised rounded-2xl overflow-hidden hover:bg-surface-elevated transition-colors cursor-pointer
// - 图片: product.thumbnail, aspect-square, object-cover, group-hover:scale-105 transition-transform
// - 内容区 padding-4:
//   - 品牌: text-accent-muted text-sm
//   - 名称: text-white font-medium truncate
//   - 价格: text-accent-primary text-lg font-semibold
//   - 评分: 显示星星图标（使用 @heroicons/react StarIcon）+ reviewCount
// - 点击时调用 onClick(product.id)
```

**`ProductGrid.jsx`:**
```javascript
// Props: { products }
// Display:
// - Grid 容器: grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6
// - 遍历 products，渲染 ProductCard
// - 空状态: products.length === 0 时显示 "No products found"
```

**`FilterSidebar.jsx`:**
```javascript
// Props: { onFilterChange }
// State: { categories: [], priceRanges: [], brands: [], minRating: 0 }
// Sections:
// 1. 分类（复选框列表）
// 2. 价格区间（单选: $0-$50, $50-$100, $100-$200, $200+, All）
// 3. 品牌（复选框列表，从 products 提取唯一品牌）
// 4. 评分（单选: 4+ Stars, 3+ Stars, All）
// - 每次状态变化时调用 onFilterChange(filterState)
// - 提供 "Clear All" 按钮重置筛选
// - Desktop: 固定侧边栏 w-64
// - Mobile: 使用 Headless UI Dialog 实现全屏抽屉
```

**`SearchBar.jsx`:**
```javascript
// Props: { value, onChange }
// Display:
// - Input: bg-surface-raised rounded-full px-4 py-2 text-white
// - 左侧搜索图标（MagnifyingGlassIcon）
// - 右侧清除按钮（value 非空时显示，XMarkIcon）
// - Placeholder: "Search products..."
// - onChange 实时触发
```

**`SortDropdown.jsx`:**
```javascript
// Props: { value, onChange }
// Options:
// - { value: 'default', label: 'Featured' }
// - { value: 'price-asc', label: 'Price: Low to High' }
// - { value: 'price-desc', label: 'Price: High to Low' }
// - { value: 'rating-desc', label: 'Rating: High to Low' }
// - 使用 Headless UI Menu 实现下拉菜单
// - 按钮: bg-surface-elevated rounded-full px-4 py-2 text-white
```

**前置条件：**
- 任务 2（mockProducts 已准备）

**验收标准：**
- ProductCard 正确展示商品信息
- FilterSidebar 筛选条件变化时触发回调
- SearchBar 输入实时触发 onChange
- SortDropdown 选项切换正常
- 移动端 FilterSidebar 抽屉可打开/关闭

---

## 四、商品列表页

- [x] 任务 6: 商品列表页（HomePage）

### 任务 6: 商品列表页（HomePage）

**涉及文件：**
- 新建: `src/pages/HomePage.jsx`

**要求：**
1. 导入 `products` 从 `mockProducts.js`
2. State 管理：
   ```javascript
   const [searchKeyword, setSearchKeyword] = useState('');
   const [filters, setFilters] = useState({ categories: [], priceRange: null, brands: [], minRating: 0 });
   const [sortBy, setSortBy] = useState('default');
   ```
3. 过滤逻辑（useMemo）：
   - 搜索：`product.name.toLowerCase().includes(searchKeyword.toLowerCase())`
   - 分类：`filters.categories.length === 0 || filters.categories.includes(product.category)`
   - 价格区间：根据 `filters.priceRange` 过滤（$0-$50: price <= 50, ...）
   - 品牌：`filters.brands.length === 0 || filters.brands.includes(product.brand)`
   - 评分：`product.rating >= filters.minRating`
4. 排序逻辑（useMemo）：
   - `price-asc`: sort by price ascending
   - `price-desc`: sort by price descending
   - `rating-desc`: sort by rating descending
   - `default`: 保持原顺序
5. Layout:
   ```jsx
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     <div className="flex gap-8">
       {/* Left: FilterSidebar */}
       <div className="hidden lg:block">
         <FilterSidebar onFilterChange={setFilters} />
       </div>

       {/* Right: Search + Sort + Grid */}
       <div className="flex-1">
         <div className="flex flex-col sm:flex-row gap-4 mb-6">
           <SearchBar value={searchKeyword} onChange={setSearchKeyword} />
           <SortDropdown value={sortBy} onChange={setSortBy} />
           {/* Mobile Filter Button */}
           <button className="lg:hidden">Filters</button>
         </div>
         <ProductGrid products={filteredAndSortedProducts} />
       </div>
     </div>
   </div>
   ```
6. ProductCard 点击时使用 `useNavigate()` 跳转到 `/product/:id`

**前置条件：**
- 任务 5（Product 组件已实现）

**验收标准：**
- 商品列表正确展示
- 搜索功能实时过滤
- 筛选功能正确（分类、价格、品牌、评分）
- 排序功能正确
- 点击商品卡片跳转到详情页
- 移动端筛选按钮可打开抽屉

---

## 五、商品详情页

- [x] 任务 7: 商品详情页（ProductDetailPage）

### 任务 7: 商品详情页（ProductDetailPage）

**涉及文件：**
- 新建: `src/pages/ProductDetailPage.jsx`
- 新建: `src/components/Product/ProductDetail.jsx`

**要求：**

**`ProductDetail.jsx`:**
```javascript
// Props: { product }
// Layout (两栏布局):
// - 左侧（40%）:
//   - 主图（大图）
//   - 缩略图行（点击切换主图）
// - 右侧（60%）:
//   - 品牌（text-accent-muted）
//   - 名称（text-2xl font-bold text-white）
//   - 评分 + 评论数
//   - 价格（text-3xl text-accent-primary）+ 原价（划线）
//   - 库存状态（inStock ? "In Stock" : "Out of Stock"）
//   - 商品描述
//   - 卖点列表（ul li，每个 feature 一行）
//   - "Add to Cart" 按钮（rounded-full bg-accent-primary px-8 py-3）
//     - 点击时调用 dispatch({ type: 'ADD_TO_CART', payload: { product } })
//     - 检查库存：stockCount > 0
//     - 显示成功提示（可使用简单的 alert 或 toast）
// - 移动端: 单栏布局，图片在上
```

**`ProductDetailPage.jsx`:**
```javascript
import { useParams } from 'react-router-dom';
import { products } from '../data/mockProducts';
import ProductDetail from '../components/Product/ProductDetail';

function ProductDetailPage() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="text-center py-20 text-white">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <ProductDetail product={product} />
    </div>
  );
}
```

**前置条件：**
- 任务 3（CartContext 已实现）
- 任务 2（mockProducts 已准备）

**验收标准：**
- 详情页正确展示商品信息
- 图片切换功能正常
- "Add to Cart" 按钮点击后购物车数量增加
- 库存不足时显示提示
- 产品不存在时显示 "Product not found"
- 移动端布局适配

---

## 六、购物车模块与页面

- [x] 任务 8: 购物车组件（CartItem, CartSummary）
- [x] 任务 9: 购物车页面（CartPage）

### 任务 8: 购物车组件（CartItem, CartSummary）

**涉及文件：**
- 新建: `src/components/Cart/CartItem.jsx`
- 新建: `src/components/Cart/CartSummary.jsx`

**要求：**

**`CartItem.jsx`:**
```javascript
// Props: { item, onUpdateQuantity, onRemove }
// Display:
// - Flexbox 横向布局: gap-4
// - 左侧: 商品缩略图（w-24 h-24 rounded-lg）
// - 中间:
//   - 商品名称 + 品牌
//   - 单价（text-accent-primary）
// - 右侧:
//   - 数量选择器（- button, 数字, + button）
//     - 点击 - 时调用 onUpdateQuantity(item.productId, item.quantity - 1)
//     - 点击 + 时调用 onUpdateQuantity(item.productId, item.quantity + 1)
//     - 数量为 1 时禁用 - 按钮
//     - 数量达到 stockCount 时禁用 + 按钮
//   - 小计价格（price * quantity）
//   - 删除按钮（TrashIcon，点击调用 onRemove(item.productId)）
// - 样式: bg-surface-raised rounded-xl p-4
```

**`CartSummary.jsx`:**
```javascript
// Props: { totalItems, totalPrice }
// Display:
// - 卡片容器: bg-surface-elevated rounded-2xl p-6
// - 标题: "Order Summary"
// - 行 1: "Items" - {totalItems}
// - 行 2: "Total" - ${totalPrice.toFixed(2)} USD
// - "Proceed to Checkout" 按钮
//   - 点击显示 alert("Checkout功能敬请期待")
//   - 样式: w-full bg-accent-primary rounded-full py-3 mt-4
```

**前置条件：**
- 任务 3（CartContext 已实现）

**验收标准：**
- CartItem 正确展示商品信息
- 数量选择器功能正常（增减、边界限制）
- 删除按钮点击后商品移除
- CartSummary 显示正确的总数和总价

---

### 任务 9: 购物车页面（CartPage）

**涉及文件：**
- 新建: `src/pages/CartPage.jsx`

**要求：**
1. 从 `useCart()` 获取 `cart` 和 `dispatch`
2. 定义回调函数：
   ```javascript
   const handleUpdateQuantity = (productId, newQuantity) => {
     if (newQuantity === 0) {
       dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
     } else {
       dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity: newQuantity } });
     }
   };

   const handleRemove = (productId) => {
     dispatch({ type: 'REMOVE_FROM_CART', payload: { productId } });
   };
   ```
3. Layout:
   ```jsx
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
     <h1 className="text-3xl font-bold text-white mb-8">Shopping Cart</h1>

     {cart.items.length === 0 ? (
       <div className="text-center py-20">
         <p className="text-gray-400 text-xl mb-6">Your cart is empty</p>
         <Link to="/" className="bg-accent-primary text-white px-6 py-3 rounded-full">
           Continue Shopping
         </Link>
       </div>
     ) : (
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Left: Cart Items (2/3) */}
         <div className="lg:col-span-2 space-y-4">
           {cart.items.map(item => (
             <CartItem
               key={item.productId}
               item={item}
               onUpdateQuantity={handleUpdateQuantity}
               onRemove={handleRemove}
             />
           ))}
         </div>

         {/* Right: Summary (1/3) */}
         <div>
           <CartSummary totalItems={cart.totalItems} totalPrice={cart.totalPrice} />
         </div>
       </div>
     )}
   </div>
   ```

**前置条件：**
- 任务 8（CartItem, CartSummary 已实现）

**验收标准：**
- 购物车为空时显示空状态
- 购物车有商品时正确展示列表和汇总
- 调整数量功能正常
- 删除商品功能正常
- 总价实时更新
- "Continue Shopping" 链接可返回首页
- Desktop 两栏布局，Mobile 单栏布局

---

## 七、文档与收尾

- [x] 任务 10: README 文档

### 任务 10: README 文档

**涉及文件：**
- 新建: `README.md`

**要求：**
编写完整的项目说明文档，包含以下章节：

1. **项目简介**
   - 应用名称：Overseas Mall
   - 功能描述：面向海外消费者的商品选购应用
   - 核心功能：商品浏览、搜索筛选、购物车管理

2. **技术栈**
   - Vite 5.x
   - React 18
   - React Router v6
   - Tailwind CSS 3.x
   - Headless UI

3. **快速开始**
   ```bash
   # 安装依赖
   npm install

   # 启动开发服务器
   npm run dev

   # 构建生产版本
   npm run build

   # 预览生产构建
   npm run preview
   ```

4. **项目结构**
   ```
   src/
   ├── components/
   │   ├── Layout/
   │   ├── Product/
   │   └── Cart/
   ├── contexts/
   ├── data/
   ├── pages/
   ├── utils/
   ├── App.jsx
   └── main.jsx
   ```

5. **功能特性**
   - 响应式设计（Desktop / Tablet / Mobile）
   - 实时搜索
   - 多维度筛选（分类、价格、品牌、评分）
   - 商品排序
   - 购物车持久化（localStorage）
   - 深色主题 UI

6. **演示说明**
   - 使用 Mock 数据（20-30 个商品）
   - 购物车数据刷新后保留
   - Checkout 功能为占位（显示提示）

**前置条件：**
- 所有功能任务已完成

**验收标准：**
- README 内容完整清晰
- 安装和启动步骤准确
- 项目结构说明清晰
- 功能特性描述完整

---

## 任务完成检查清单

完成所有任务后，进行最终验收：

### 功能完整性
- [ ] 商品列表页展示所有商品（响应式网格）
- [ ] 搜索功能正常（实时过滤）
- [ ] 筛选功能正常（分类、价格、品牌、评分）
- [ ] 排序功能正常（价格、评分）
- [ ] 商品详情页展示完整信息
- [ ] 添加购物车功能（含库存检查）
- [ ] 购物车页面增删改功能
- [ ] 价格计算正确
- [ ] localStorage 持久化生效

### 用户体验
- [ ] 页面加载流畅（无明显卡顿）
- [ ] 响应式适配完整（Desktop/Tablet/Mobile）
- [ ] 交互反馈及时（悬停、点击、加载状态）
- [ ] 空状态和错误提示友好
- [ ] 移动端触摸操作顺畅

### 代码质量
- [ ] 组件拆分合理，职责清晰
- [ ] 无 ESLint 错误
- [ ] 代码格式符合 Prettier 规范
- [ ] 无 console 警告/错误
- [ ] 关键逻辑有注释

### 演示就绪
- [ ] Mock 数据丰富且真实
- [ ] 视觉风格统一（深色主题 + 圆角设计）
- [ ] 可独立运行（npm run dev 即可启动）
- [ ] README 包含项目说明和启动步骤
