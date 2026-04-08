import { Heart, ShoppingCart, User, LogOut, Search } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const Navbar = ({ search, onSearchChange, cartCount = 0, userEmail, onLogout }) => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-6 px-4 py-4 sm:px-6">
        <Link to="/" className="text-2xl font-black tracking-tighter text-[#0066FF] hover:opacity-90">
          OutfitHub
        </Link>

        <div className="relative mx-auto max-w-xl flex-1 px-4">
          <div className="pointer-events-none absolute left-8 top-1/2 -translate-y-1/2 text-slate-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search for clothes, brands and more..."
            className="h-12 w-full rounded-2xl border-none bg-slate-100 pl-12 pr-4 text-sm text-slate-900 transition-all focus:bg-slate-200 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/wishlist')}
            className="group rounded-full text-slate-600 hover:bg-slate-100 hover:text-[#0066FF]"
          >
            <Heart size={22} className="group-hover:fill-current" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => navigate('/cart')}
            className="relative rounded-full text-slate-600 hover:bg-slate-100 hover:text-[#0066FF]"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF9900] text-[10px] font-bold text-white ring-2 ring-white">
                {cartCount}
              </span>
            )}
          </Button>

          <div className="ml-2 hidden h-8 w-px bg-slate-200 sm:block"></div>

          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-xs font-bold text-slate-900 truncate max-w-[150px]">
                {userEmail?.split('@')[0] || 'Guest'}
              </span>
              <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Customer</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate('/profile')}
              className="rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200"
            >
              <User size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-slate-400 hover:bg-rose-50 hover:text-rose-600"
              onClick={onLogout}
              title="Logout"
            >
              <LogOut size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
