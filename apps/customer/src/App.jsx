import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

import { CartPage } from './pages/CartPage.jsx'
import { CustomerOrdersPage } from './pages/CustomerOrdersPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ShopPage } from './pages/ShopPage.jsx'
import { SignupPage } from './pages/SignupPage.jsx'
import { WishlistPage } from './pages/WishlistPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { CheckoutPage } from './pages/CheckoutPage.jsx'
import { supabase } from './lib/supabase.js'

const ProtectedRoute = ({ session, children }) => {
  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  const location = useLocation()
  const [session, setSession] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const initSession = async () => {
      const {
        data: { session: currentSession },
      } = await supabase.auth.getSession()

      if (isMounted) {
        setSession(currentSession)
        setAuthLoading(false)
      }
    }

    initSession()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      setSession(updatedSession)
      setAuthLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  useEffect(() => {
    const titles = {
      '/': 'OutfitHub | Shop',
      '/cart': 'OutfitHub | Cart',
      '/wishlist': 'OutfitHub | Wishlist',
      '/profile': 'OutfitHub | Profile',
      '/checkout': 'OutfitHub | Checkout',
      '/orders': 'OutfitHub | Orders',
      '/login': 'OutfitHub | Login',
      '/signup': 'OutfitHub | Signup',
    }

    document.title = titles[location.pathname] || 'OutfitHub | Clothing Marketplace'
  }, [location.pathname])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (authLoading) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-100">
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-4 text-sm font-semibold text-slate-700 shadow-sm">
          Loading OutfitHub...
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={session ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/signup" element={session ? <Navigate to="/" replace /> : <SignupPage />} />

      <Route
        path="/"
        element={
          <ProtectedRoute session={session}>
            <ShopPage session={session} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/cart"
        element={
          <ProtectedRoute session={session}>
            <CartPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <ProtectedRoute session={session}>
            <WishlistPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute session={session}>
            <ProfilePage session={session} onLogout={handleLogout} />
          </ProtectedRoute>
        }
      />
      <Route
        path="/checkout"
        element={
          <ProtectedRoute session={session}>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute session={session}>
            <CustomerOrdersPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
