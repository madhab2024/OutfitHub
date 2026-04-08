import { NavLink, Route, Routes } from 'react-router-dom'

import { DashboardPage } from './pages/DashboardPage.jsx'
import { ProductsPage } from './pages/ProductsPage.jsx'
import { OrdersPage } from './pages/OrdersPage.jsx'

const navClassName = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-slate-900 text-white' : 'bg-white/60 text-slate-700 hover:bg-white'
  }`

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 via-orange-50 to-rose-100">
      <div className="mx-auto max-w-6xl p-6 sm:p-10">
        <header className="mb-8 rounded-3xl border border-white/50 bg-white/70 p-6 shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Admin Portal</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
            Multi-Vendor Clothing Control Center
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-600">
            Manage catalog quality, order flow, and operational KPIs across all vendors in one place.
          </p>
          <nav className="mt-5 flex flex-wrap gap-2">
            <NavLink to="/" end className={navClassName}>
              Dashboard
            </NavLink>
            <NavLink to="/products" className={navClassName}>
              Products
            </NavLink>
            <NavLink to="/orders" className={navClassName}>
              Orders
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
