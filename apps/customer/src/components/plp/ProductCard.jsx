import { faHeart, faShoppingCart, faStar } from '@fortawesome/free-solid-svg-icons'
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { cn } from '../../lib/utils'

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`

export const ProductCard = ({ product, isWishlisted, onToggleWishlist, onAddToCart }) => {
  const discountPercent = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <Card className="group overflow-hidden transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <button
          type="button"
          aria-label="Add to wishlist"
          onClick={() => onToggleWishlist(product.id)}
          className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-600 shadow hover:text-rose-500"
        >
          <FontAwesomeIcon
            icon={isWishlisted ? faHeart : faHeartRegular}
            className={cn('h-4 w-4', isWishlisted ? 'text-rose-500' : '')}
          />
        </button>
      </div>

      <CardContent>
        <p className="line-clamp-1 text-sm font-semibold text-slate-900">{product.name}</p>
        <p className="mt-1 text-xs text-slate-500">{product.category}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className="text-xl font-black text-slate-900">{formatCurrency(product.price)}</span>
          <span className="text-sm text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
          <Badge variant="danger">{discountPercent}% OFF</Badge>
        </div>

        <div className="mt-2 flex items-center gap-1 text-sm text-amber-600">
          <FontAwesomeIcon icon={faStar} className="h-4 w-4" />
          <span className="font-semibold">{product.rating}</span>
          <span className="text-slate-500">({product.reviewCount})</span>
        </div>

        <Button className="mt-3 w-full" onClick={() => onAddToCart(product.id)}>
          <FontAwesomeIcon icon={faShoppingCart} className="h-4 w-4" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )
}
