import React from 'react'
import { Routes, Route } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage.jsx'
import AddProductPage from './pages/AddProductPage.jsx'
import OrdersPage from './pages/OrdersPage.jsx'
import AnalyticsPage from './pages/AnalyticsPage.jsx'
import StockPage from './pages/StockPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/stock" element={<StockPage />} />
    </Routes>
  )
}

export default App
