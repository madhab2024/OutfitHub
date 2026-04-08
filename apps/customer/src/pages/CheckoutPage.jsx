import { useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ChevronRight,
  Navigation,
  CheckCircle2,
  Calendar,
  Truck
} from 'lucide-react'
import { Navbar } from '../components/plp/Navbar'
import { clearCart } from '../store/cartSlice'
import { AddressMapPicker } from '../components/checkout/AddressMapPicker'

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`

export const CheckoutPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const catalog = useSelector((state) => state.catalog.items)
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [address, setAddress] = useState('123 Fashion Street, Cyber City, Bangalore, 560001')
  const [isMapOpen, setIsMapOpen] = useState(false)
  
  const fullCartItems = cartItems.map((cartItem) => {
    const product = catalog.find((p) => p.id === cartItem.id)
    return { ...product, quantity: cartItem.quantity }
  }).filter(item => item.id)

  const subtotal = fullCartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const gst = subtotal * 0.18
  const deliveryCharges = subtotal > 1000 ? 0 : 99
  const platformFee = 40
  const totalAmount = subtotal + gst + deliveryCharges + platformFee

  const expectedDeliveryDate = useMemo(() => {
    const date = new Date()
    date.setDate(date.getDate() + 4)
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
  }, [])

  const handlePlaceOrder = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      dispatch(clearCart())
    }, 2000)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar cartCount={0} />
        <div className="flex flex-col items-center justify-center p-8 py-24 text-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-100 text-green-600 mb-8">
            <CheckCircle2 size={56} />
          </div>
          <h1 className="text-4xl font-black text-slate-900">Order Confirmed!</h1>
          <p className="mt-4 text-lg text-slate-500 max-w-md">
            Your fashion haul is on its way. We've sent the details to your email.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => navigate('/orders')}
              className="rounded-2xl bg-slate-900 px-8 py-4 font-bold text-white transition hover:bg-slate-800"
            >
              Track Order
            </button>
            <button 
              onClick={() => navigate('/')}
              className="rounded-2xl border-2 border-slate-100 px-8 py-4 font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartItems.length} />
      
      <main className="mx-auto w-full max-w-[1100px] px-4 py-8 sm:px-6">
        <button 
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Bag
        </button>

        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          <div className="space-y-6">
            {/* Delivery Address Section */}
            <section className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-[#0066FF]">
                    <MapPin size={20} />
                  </div>
                  <h2 className="text-xl font-black text-slate-900">Delivery Address</h2>
                </div>
                <button 
                  className="text-xs font-black uppercase tracking-widest text-[#0066FF] hover:underline"
                  onClick={() => setIsMapOpen(true)}
                >
                  Change
                </button>
              </div>
              
              <div className="flex items-start gap-4 rounded-3xl border-2 border-slate-100 bg-slate-50 p-5">
                <div className="mt-1 hidden sm:block">
                  <div className="rounded-full bg-slate-200 p-2 text-slate-500">
                    <Navigation size={18} />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-slate-900">Current Location</p>
                  <p className="mt-1 text-sm text-slate-500 leading-relaxed">{address}</p>
                </div>
              </div>
              
              <div className="mt-6 flex items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-600">
                  <Truck size={14} />
                  <span>Standard Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={14} />
                  <span>By {expectedDeliveryDate}</span>
                </div>
              </div>
            </section>

            {/* Payment Summary Detail */}
            <section className="rounded-[32px] bg-white p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <CreditCard size={20} />
                </div>
                <h2 className="text-xl font-black text-slate-900">Final Summary</h2>
              </div>

              <div className="space-y-4">
                {fullCartItems.map(item => (
                  <div key={item.id} className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-3">
                      <span className="flex h-6 w-6 items-center justify-center rounded bg-slate-100 text-[10px] font-black">{item.quantity}x</span>
                      <span className="font-medium text-slate-600 line-clamp-1">{item.name}</span>
                    </div>
                    <span className="font-bold text-slate-900">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                ))}
                
                <div className="border-t border-slate-100 pt-6 mt-6 space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Order Subtotal</span>
                    <span className="font-bold text-slate-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">GST (18%)</span>
                    <span className="font-bold text-slate-900">{formatCurrency(gst)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Delivery Charges</span>
                    <span className="font-bold text-slate-900">{deliveryCharges === 0 ? 'FREE' : formatCurrency(deliveryCharges)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-500">Platform Fee</span>
                    <span className="font-bold text-slate-900">{formatCurrency(platformFee)}</span>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl bg-[#0066FF] p-6 text-white text-center sm:text-left">
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-blue-200">Total Payable Amount</p>
                      <p className="mt-1 text-3xl font-black">{formatCurrency(totalAmount)}</p>
                    </div>
                    <button 
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full sm:w-auto rounded-xl bg-white px-8 py-4 font-black text-[#0066FF] transition hover:bg-blue-50 active:scale-[0.98] disabled:opacity-50"
                    >
                      {isProcessing ? 'Processing...' : 'Verify & Pay'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="rounded-[32px] bg-slate-900 p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck size={24} className="text-blue-400" />
                <h3 className="text-lg font-bold">Secure Checkout</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Your payment is secure with end-to-end encryption. We support all major UPI, Cards and Net Banking.
              </p>
              
              <div className="mt-8 space-y-3">
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse"></div>
                  99.9% Success Rate
                </div>
                <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-medium">
                  <Clock size={16} className="text-blue-200" />
                  Instant Refund Support
                </div>
              </div>
            </div>

            <div className="rounded-[32px] border-2 border-dashed border-slate-200 p-8 text-center bg-white/50">
              <Calendar size={32} className="mx-auto text-slate-300 mb-4" />
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Expected by</p>
              <p className="mt-2 text-xl font-black text-slate-900">{expectedDeliveryDate}</p>
              <p className="mt-1 text-xs text-slate-500">Standard Fulfillment</p>
            </div>
          </aside>
        </div>
      </main>

      <AddressMapPicker 
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        initialAddress={address}
        onConfirm={(newAddress) => {
          setAddress(newAddress)
          setIsMapOpen(false)
        }}
      />
    </div>
  )
}
