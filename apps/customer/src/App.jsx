import { NavLink, Route, Routes } from 'react-router-dom'

import { CartPage } from './pages/CartPage.jsx'
import { CustomerOrdersPage } from './pages/CustomerOrdersPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'

const navClassName = ({ isActive }) =>
  `rounded-full px-4 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-teal-900 text-white' : 'bg-white/70 text-teal-900 hover:bg-white'
  }`

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-100 via-teal-50 to-lime-100">
      <div className="mx-auto max-w-6xl p-6 sm:p-10">
        <header className="mb-8 rounded-3xl border border-white/60 bg-white/80 p-6 shadow-xl backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">Customer App</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-teal-950 sm:text-4xl">
            Discover Trendy Looks, Fast Checkout
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-teal-800/80">
            Shop from multiple vendors, track orders, and manage your cart in one clean journey.
          </p>
          <nav className="mt-5 flex flex-wrap gap-2">
            <NavLink to="/" end className={navClassName}>
              Shop
            </NavLink>
            <NavLink to="/cart" className={navClassName}>
              Cart
            </NavLink>
            <NavLink to="/orders" className={navClassName}>
              Orders
            </NavLink>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/orders" element={<CustomerOrdersPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
