import { useNavigate } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Zap } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`

export const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart, onBookNow }) => {
  const navigate = useNavigate()
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const handleCardClick = () => {
    navigate(`/product/${product.id}`)
  }

  return (
    <Card className="group relative border-none bg-white p-2 shadow-sm transition-all duration-300 hover:shadow-xl sm:p-3 overflow-hidden">
      <div 
        className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm transition-all hover:bg-white hover:text-rose-500 z-10"
        >
          <Heart
            size={18}
            className={cn('transition-all', isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : '')}
          />
        </button>

        {/* Discount Badge */}
        {discountPercent > 0 && (
          <div className="absolute left-3 top-3 rounded-lg bg-rose-500 px-2 py-1 text-[10px] font-bold text-white shadow-sm z-10">
            {discountPercent}% OFF
          </div>
        )}
      </div>

      <CardContent className="mt-4 p-0 px-1">
        <div 
          className="flex items-start justify-between gap-2 cursor-pointer"
          onClick={handleCardClick}
        >
          <div>
            <p className="line-clamp-1 text-sm font-bold text-slate-800 transition-colors group-hover:text-[#0066FF]">{product.name}</p>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">{product.category}</p>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-1.5 py-0.5 text-amber-600">
            <Star size={12} className="fill-current" />
            <span className="text-[11px] font-bold">{product.rating}</span>
          </div>
        </div>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-lg font-black text-slate-900">{formatCurrency(product.price)}</span>
          <span className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            className="flex flex-[2] items-center justify-center gap-2 rounded-xl bg-[#0066FF] py-2.5 text-xs font-bold text-white transition-all hover:bg-blue-700 active:scale-[0.98]"
            onClick={(e) => {
              e.stopPropagation()
              onBookNow(product.id)
            }}
          >
            <Zap size={14} fill="currentColor" />
            Book Now
          </button>
          <button
            className="flex flex-1 items-center justify-center rounded-xl border-2 border-slate-100 text-slate-600 transition-all hover:bg-slate-50 hover:text-[#0066FF] hover:border-blue-100"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart(product.id)
            }}
            title="Add to Cart"
          >
            <ShoppingCart size={16} />
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
