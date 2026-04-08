import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, ShoppingBag, ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/plp/Navbar'
import { ProductCard } from '../components/plp/ProductCard'
import { addToCart, toggleWishlist } from '../store/cartSlice'

export const WishlistPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const wishlistItems = useSelector((state) => state.cart.wishlistItems)
  const cartItems = useSelector((state) => state.cart.cartItems)
  const catalog = useSelector((state) => state.catalog.items)
  
  const savedProducts = catalog.filter((product) => wishlistItems.includes(product.id))

  const handleBookNow = (productId) => {
    dispatch(addToCart(productId))
    navigate('/cart')
  }

  if (savedProducts.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar cartCount={cartItems.length} />
        <div className="flex flex-col items-center justify-center p-8 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-rose-50 text-rose-500">
            <Heart size={48} />
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900">Your wishlist is empty</h2>
          <p className="mt-2 max-w-sm text-slate-500">
            You haven't saved any items yet. Start exploring and save your favorites here!
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-[#0066FF] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <ArrowLeft size={20} />
            Explore Collection
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartItems.length} />
      
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <h1 className="text-3xl font-black text-slate-900">Saved Products</h1>
          <span className="rounded-full bg-rose-100 px-3 py-1 text-sm font-bold text-rose-600">
            {savedProducts.length} Items
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {savedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={(id) => dispatch(toggleWishlist(id))}
              onAddToCart={(id) => dispatch(addToCart(id))}
              onBookNow={handleBookNow}
            />
          ))}
        </div>
      </main>
    </div>
  )
}
