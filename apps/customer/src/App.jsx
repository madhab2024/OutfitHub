import { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import { CartPage } from './pages/CartPage.jsx'
import { CustomerOrdersPage } from './pages/CustomerOrdersPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'

function App() {
  const location = useLocation()

  useEffect(() => {
    const titles = {
      '/': 'OutfitHub | Shop',
      '/cart': 'OutfitHub | Cart',
      '/orders': 'OutfitHub | Orders',
    }

    document.title = titles[location.pathname] || 'OutfitHub | Clothing Marketplace'
  }, [location.pathname])

  return (
    <Routes>
      <Route path="/" element={<ShopPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/orders" element={<CustomerOrdersPage />} />
    </Routes>
  )
}

export default App
