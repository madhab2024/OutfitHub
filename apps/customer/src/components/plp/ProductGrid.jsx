import { Button } from '../ui/button'
import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'
import { ProductCard } from './ProductCard'

const ProductCardSkeleton = () => (
  <Card className="overflow-hidden">
    <Skeleton className="aspect-[4/5] w-full" />
    <CardContent>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="mt-2 h-4 w-1/2" />
      <Skeleton className="mt-4 h-10 w-full" />
    </CardContent>
  </Card>
)

export const ProductGrid = ({
  products,
  loading,
  canLoadMore,
  onLoadMore,
  wishlist,
  onToggleWishlist,
  onAddToCart,
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <Card className="p-10 text-center">
        <p className="text-lg font-bold text-slate-900">No products found</p>
        <p className="mt-1 text-sm text-slate-500">Try changing filters, category, or search query.</p>
      </Card>
    )
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            isWishlisted={wishlist.has(product.id)}
            onToggleWishlist={onToggleWishlist}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>

      {canLoadMore ? (
        <div className="mt-6 text-center">
          <Button size="lg" onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  )
}
