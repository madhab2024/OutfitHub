import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
  User, 
  Package, 
  MapPin, 
  Settings, 
  CreditCard, 
  LogOut, 
  ChevronRight, 
  ShoppingBag,
  Clock,
  LayoutDashboard
} from 'lucide-react'
import { Navbar } from '../components/plp/Navbar'
import { supabase } from '../lib/supabase'

const StatCard = ({ icon: Icon, label, value, color }) => (
  <div className="flex items-center gap-4 rounded-3xl bg-white p-6 shadow-sm">
    <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
      <Icon size={24} />
    </div>
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p>
      <p className="text-xl font-black text-slate-900">{value}</p>
    </div>
  </div>
)

const ActionLink = ({ icon: Icon, label, description, onClick }) => (
  <button
    onClick={onClick}
    className="flex w-full items-center justify-between rounded-[28px] bg-white p-5 shadow-sm transition-all hover:shadow-md hover:translate-x-1"
  >
    <div className="flex items-center gap-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-50 text-slate-600">
        <Icon size={22} />
      </div>
      <div className="text-left">
        <p className="font-bold text-slate-900">{label}</p>
        <p className="text-sm text-slate-500">{description}</p>
      </div>
    </div>
    <ChevronRight size={20} className="text-slate-300" />
  </button>
)

export const ProfilePage = ({ session, onLogout }) => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems)
  const wishlistItems = useSelector((state) => state.cart.wishlistItems)
  const user = session?.user

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar cartCount={cartItems.length} userEmail={user?.email} onLogout={onLogout} />
      
      <main className="mx-auto w-full max-w-[1280px] px-4 py-8 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
          {/* User Profile Info */}
          <div className="space-y-6">
            <div className="flex flex-col items-center rounded-[40px] bg-white p-10 shadow-sm text-center">
              <div className="relative h-32 w-32">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-[#0066FF]">
                  <User size={64} />
                </div>
                <div className="absolute bottom-1 right-1 h-8 w-8 rounded-full border-4 border-white bg-green-500"></div>
              </div>
              
              <h1 className="mt-6 text-2xl font-black text-slate-900 truncate w-full">
                {user?.email?.split('@')[0] || 'Member'}
              </h1>
              <p className="text-sm font-medium text-slate-500">{user?.email}</p>
              <div className="mt-4 rounded-full bg-blue-50 px-4 py-1 text-xs font-bold text-[#0066FF] uppercase tracking-widest">
                Level 1 Member
              </div>

              <div className="mt-8 flex w-full flex-col gap-3">
                <button className="flex h-12 w-full items-center justify-center rounded-2xl bg-slate-100 text-sm font-bold text-slate-900 transition-all hover:bg-slate-200">
                  Edit Profile
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl border-2 border-rose-100 text-sm font-bold text-rose-500 transition-all hover:bg-rose-50"
                >
                  <LogOut size={18} />
                  Log Out
                </button>
              </div>
            </div>

            <div className="rounded-3xl bg-slate-900 p-8 text-white">
              <h3 className="text-lg font-bold">OutfitHub Premium</h3>
              <p className="mt-2 text-sm text-slate-400">Upgrade to get free delivery on all orders and early access to drops.</p>
              <button className="mt-6 w-full rounded-2xl bg-[#FF9900] py-4 font-black transition-all hover:bg-[#e68a00]">
                Upgrade Now
              </button>
            </div>
          </div>

          {/* Stats and Navigation */}
          <div className="space-y-8">
            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard 
                icon={ShoppingBag} 
                label="Orders" 
                value="12" 
                color="bg-blue-50 text-blue-600" 
              />
              <StatCard 
                icon={Clock} 
                label="Saved" 
                value={wishlistItems.length.toString()} 
                color="bg-rose-50 text-rose-500" 
              />
              <StatCard 
                icon={CreditCard} 
                label="Points" 
                value="450" 
                color="bg-amber-50 text-amber-600" 
              />
            </div>

            <div>
              <h2 className="text-xl font-black text-slate-900 mb-6">Account Settings</h2>
              <div className="grid gap-4">
                <ActionLink 
                  icon={Package} 
                  label="My Orders" 
                  description="Track, return or buy things again" 
                  onClick={() => navigate('/orders')}
                />
                <ActionLink 
                  icon={MapPin} 
                  label="Shipping Addresses" 
                  description="Manage addresses for fast checkout" 
                />
                <ActionLink 
                  icon={CreditCard} 
                  label="Payment Methods" 
                  description="Save cards for easier payments" 
                />
                <ActionLink 
                  icon={Settings} 
                  label="Security & Privacy" 
                  description="Change password and privacy settings" 
                />
              </div>
            </div>

            <div className="rounded-[40px] border border-dashed border-slate-300 p-10 text-center">
              <LayoutDashboard size={40} className="mx-auto text-slate-300" />
              <p className="mt-4 text-sm font-bold text-slate-400 uppercase tracking-[0.2em]">Activity History</p>
              <p className="mt-2 text-xs text-slate-400">All your browsing and interaction history will appear here.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
