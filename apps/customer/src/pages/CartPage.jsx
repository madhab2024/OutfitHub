import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, ShieldCheck, Truck } from 'lucide-react'
import { Navbar } from '../components/plp/Navbar'
import { removeFromCart, updateQuantity } from '../store/cartSlice'

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`

export const CartPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const catalog = useSelector((state) => state.catalog.items)
  
  // Map cart items (ids) to actual product details
  const fullCartItems = cartItems.map((cartItem) => {
    const product = catalog.find((p) => p.id === cartItem.id)
    return { ...product, quantity: cartItem.quantity }
  }).filter(item => item.id)

  const subtotal = fullCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 99
  const total = subtotal + shipping

  if (fullCartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Navbar cartCount={0} />
        <div className="flex flex-col items-center justify-center p-8 py-20 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 text-[#0066FF]">
            <ShoppingBag size={48} />
          </div>
          <h2 className="mt-6 text-3xl font-black text-slate-900">Your bag is empty</h2>
          <p className="mt-2 max-w-sm text-slate-500">
            Looks like you haven't added anything to your cart yet. Let's find something amazing for you!
          </p>
          <button
            onClick={() => navigate('/')}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-[#0066FF] px-8 py-4 text-lg font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
          >
            <ArrowLeft size={20} />
            Continue Shopping
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
          <h1 className="text-3xl font-black text-slate-900">Your Shopping Bag</h1>
          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-[#0066FF]">
            {fullCartItems.length} Items
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Cart Items List */}
          <div className="space-y-4">
            {fullCartItems.map((item) => (
              <div key={item.id} className="flex flex-col gap-4 rounded-[24px] bg-white p-4 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center">
                <div className="h-32 w-full overflow-hidden rounded-2xl bg-slate-100 sm:h-28 sm:w-24">
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                </div>
                
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-slate-900">{item.name}</h3>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="text-slate-400 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  
                  <div className="mt-4 flex items-end justify-between">
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-1">
                      <button 
                        onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: Math.max(1, item.quantity - 1) }))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm transition-all hover:text-[#0066FF]"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-4 text-center text-sm font-bold text-slate-900">{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ productId: item.id, quantity: item.quantity + 1 }))}
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-slate-600 shadow-sm transition-all hover:text-[#0066FF]"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-xs text-slate-400">Total Price</p>
                      <p className="text-lg font-black text-slate-900">{formatCurrency(item.price * item.quantity)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary Sidebar */}
          <div className="space-y-6">
            <div className="sticky top-24 rounded-[30px] bg-white p-8 shadow-sm">
              <h2 className="text-xl font-black text-slate-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Subtotal</span>
                  <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Estimated Shipping</span>
                  <span className="font-bold text-slate-900">
                    {shipping === 0 ? <span className="text-green-600">FREE</span> : formatCurrency(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] bg-blue-50 text-[#0066FF] px-2 py-1 rounded-md font-bold">
                    Add ₹{Math.max(0, 1000 - subtotal)} more for FREE shipping!
                  </p>
                )}
                
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="flex justify-between items-end">
                    <span className="text-slate-900 font-bold">Total Amount</span>
                    <span className="text-2xl font-black text-[#0066FF]">{formatCurrency(total)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigate('/checkout')}
                  className="w-full h-14 mt-6 rounded-2xl bg-slate-900 text-white font-bold text-lg transition-all hover:bg-slate-800 active:scale-[0.98]"
                >
                  Checkout Now
                </button>
                
                <div className="mt-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <ShieldCheck size={16} className="text-emerald-500" />
                    <span>Secure Payment & Encrypted Checkout</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <Truck size={16} className="text-blue-500" />
                    <span>Free Delivery on orders above ₹1,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}