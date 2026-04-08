import { faCartShopping, faUserCircle, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button } from '../ui/button'
import { Input } from '../ui/input'

export const Navbar = ({ search, onSearchChange, cartCount = 0 }) => {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-3 px-4 py-3 sm:px-6">
        <div className="min-w-[140px] text-2xl font-black tracking-tight text-blue-700">OutfitHub</div>

        <div className="relative mx-auto max-w-2xl flex-1">
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
          />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search for clothes, brands and more..."
            className="h-11 rounded-full border-slate-300 bg-slate-50 pl-9"
          />
        </div>

        <Button variant="ghost" className="hidden text-slate-700 hover:bg-slate-100 hover:text-blue-700 sm:inline-flex">
          <FontAwesomeIcon icon={faHeart} className="h-5 w-5" />
          Wishlist
        </Button>

        <Button variant="ghost" className="relative hidden text-slate-700 hover:bg-slate-100 hover:text-blue-700 sm:inline-flex">
          <FontAwesomeIcon icon={faCartShopping} className="h-5 w-5" />
          Cart
          {cartCount > 0 ? (
            <span className="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-xs font-bold text-white">
              {cartCount}
            </span>
          ) : null}
        </Button>

        <Button variant="ghost" className="hidden text-slate-700 hover:bg-slate-100 hover:text-blue-700 sm:inline-flex">
          <FontAwesomeIcon icon={faUserCircle} className="h-5 w-5" />
          Profile
        </Button>
      </div>
    </header>
  )
}
