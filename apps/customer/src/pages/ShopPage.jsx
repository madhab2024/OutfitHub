import { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowRight,
  faChevronRight,
  faBagShopping,
  faTruck,
  faShieldHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons'

import { CategoryBar } from '../components/plp/CategoryBar'
import { FilterSidebar } from '../components/plp/FilterSidebar'
import { Navbar } from '../components/plp/Navbar'
import { ProductGrid } from '../components/plp/ProductGrid'
import { SortBar } from '../components/plp/SortBar'
import { categories } from '../data/categories'
import { addToCart, toggleWishlist } from '../store/cartSlice'
import { loadProducts } from '../store/catalogSlice'
import {
  clearSelectedCategory,
  closeFilters,
  loadMore,
  openFilters,
  resetFilters,
  setPriceRange,
  setSearch,
  setSelectedCategory,
  setSortBy,
  toggleColor,
  toggleRating,
  toggleSize,
} from '../store/uiSlice'

const pageSize = 8

const formatCurrency = (value) => `₹${value.toLocaleString('en-IN')}`

const categoryPromos = [
  { title: 'Summer Savings', subtitle: 'Fresh styles under ₹499', icon: faBagShopping },
  { title: 'Fast Delivery', subtitle: 'Get it delivered with confidence', icon: faTruck },
  { title: 'Easy Returns', subtitle: 'Simple exchanges & secure checkout', icon: faShieldHeart },
]

export const ShopPage = () => {
  const dispatch = useDispatch()
  const catalog = useSelector((state) => state.catalog.items)
  const status = useSelector((state) => state.catalog.status)
  const selectedCategory = useSelector((state) => state.ui.selectedCategory)
  const search = useSelector((state) => state.ui.search)
  const sortBy = useSelector((state) => state.ui.sortBy)
  const filters = useSelector((state) => state.ui.filters)
  const visibleCount = useSelector((state) => state.ui.visibleCount)
  const filtersOpen = useSelector((state) => state.ui.mobileFiltersOpen)
  const wishlistItems = useSelector((state) => state.cart.wishlistItems)
  const cartItems = useSelector((state) => state.cart.cartItems)

  useEffect(() => {
    dispatch(loadProducts())
  }, [dispatch])

  const maxPrice = useMemo(() => catalog.reduce((max, item) => Math.max(max, item.price), 3000), [catalog])
  const availableColors = useMemo(
    () => Array.from(new Set(catalog.map((item) => item.color))).sort((a, b) => a.localeCompare(b)),
    [catalog],
  )

  useEffect(() => {
    if (catalog.length > 0) {
      dispatch(setPriceRange([0, maxPrice]))
    }
  }, [catalog.length, dispatch, maxPrice])

  const toggleMobileFilters = () => {
    if (filtersOpen) {
      dispatch(closeFilters())
      return
    }

    dispatch(openFilters())
  }

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) {
      return []
    }

    const normalizedSearch = search.trim().toLowerCase()

    const filtered = catalog.filter((product) => {
      const inCategory = product.category === selectedCategory
      const inSearch = normalizedSearch.length === 0 || product.name.toLowerCase().includes(normalizedSearch)
      const inPrice = product.price >= filters.price[0] && product.price <= filters.price[1]
      const inSize = filters.sizes.length === 0 || product.sizes.some((size) => filters.sizes.includes(size))
      const inColor = filters.colors.length === 0 || filters.colors.includes(product.color)
      const inRating =
        filters.ratings.length === 0 || filters.ratings.some((ratingThreshold) => product.rating >= ratingThreshold)

      return inCategory && inSearch && inPrice && inSize && inColor && inRating
    })

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'price_low_high') return a.price - b.price
      if (sortBy === 'price_high_low') return b.price - a.price
      if (sortBy === 'popularity') return b.popularity - a.popularity
      if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      return 0
    })

    return sorted
  }, [catalog, filters, search, selectedCategory, sortBy])

  const displayedProducts = filteredProducts.slice(0, visibleCount)
  const canLoadMore = visibleCount < filteredProducts.length

  const dealsProducts = useMemo(() => {
    return [...catalog]
      .map((item) => ({
        ...item,
        discountPercent: Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100),
      }))
      .sort((a, b) => b.discountPercent - a.discountPercent)
      .slice(0, 10)
  }, [catalog])

  const trendingProducts = useMemo(() => {
    return [...catalog].sort((a, b) => b.popularity - a.popularity).slice(0, 10)
  }, [catalog])

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar search={search} onSearchChange={(value) => dispatch(setSearch(value))} cartCount={cartItems.length} />
      <CategoryBar
        categories={categories}
        activeCategory={selectedCategory}
        onCategoryChange={(value) => dispatch(setSelectedCategory(value))}
      />

      <main className="mx-auto w-full max-w-[1280px] px-4 py-5 sm:px-6">
        {!selectedCategory ? (
          <>
            <section className="overflow-hidden rounded-3xl border border-blue-100 bg-white shadow-xl">
              <div className="grid gap-0 lg:grid-cols-[1.05fr_0.95fr]">
                <div className="bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600 p-7 text-white sm:p-10">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-100">OutfitHub Fashion Week</p>
                  <h1 className="mt-3 max-w-xl text-4xl font-black leading-tight tracking-tight sm:text-5xl">
                    Mega Fashion Sale
                    <span className="block text-amber-300">Up to 50% OFF</span>
                  </h1>
                  <p className="mt-4 max-w-xl text-sm text-blue-100 sm:text-base">
                    Discover modern fits for men and women, everyday essentials, and premium drops with startup-level
                    curation quality.
                  </p>
                  <button
                    type="button"
                    onClick={() => dispatch(setSelectedCategory('Women'))}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-50"
                  >
                    Shop Now
                    <FontAwesomeIcon icon={faArrowRight} className="h-3 w-3" />
                  </button>
                  <div className="mt-8 grid gap-3 sm:grid-cols-3">
                    {categoryPromos.map((promo) => (
                      <article
                        key={promo.title}
                        className="rounded-2xl border border-white/20 bg-white/10 p-3 backdrop-blur"
                      >
                        <FontAwesomeIcon icon={promo.icon} className="h-4 w-4 text-white" />
                        <h3 className="mt-2 text-sm font-bold">{promo.title}</h3>
                        <p className="mt-1 text-xs text-blue-100">{promo.subtitle}</p>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="grid gap-2 bg-slate-50 p-2 sm:grid-cols-2">
                  <article className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=80"
                      alt="Modern women fashion"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/55 px-3 py-2 text-white backdrop-blur">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-blue-100">Women New Arrivals</p>
                      <p className="text-sm font-bold">Street Chic Collection</p>
                    </div>
                  </article>
                  <article className="relative overflow-hidden rounded-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=80"
                      alt="Modern men fashion"
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-x-3 bottom-3 rounded-xl bg-black/55 px-3 py-2 text-white backdrop-blur">
                      <p className="text-[11px] uppercase tracking-[0.2em] text-blue-100">Men Bestsellers</p>
                      <p className="text-sm font-bold">Minimal Everyday Looks</p>
                    </div>
                  </article>
                </div>
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Shop by category</p>
                  <h2 className="mt-1 text-2xl font-black text-slate-900">Choose a category to see what it offers</h2>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setSelectedCategory('Men'))}
                  className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                >
                  Start with Men
                  <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3" />
                </button>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => dispatch(setSelectedCategory(category.value))}
                    className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    <div className="relative aspect-[16/11] overflow-hidden">
                      <img
                        src={category.image}
                        alt={category.label}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                      <div className="absolute left-4 top-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/90 text-blue-700 shadow-md backdrop-blur">
                        <FontAwesomeIcon icon={category.icon} className="h-5 w-5" />
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <span className="inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]">
                          Explore section
                        </span>
                        <h3 className="mt-2 text-2xl font-black leading-tight">{category.label}</h3>
                        <p className="mt-1 text-sm text-slate-100/90">{category.blurb}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Hot Deals</p>
                  <h2 className="text-2xl font-black text-slate-900">Today&apos;s Fashion Discounts</h2>
                </div>
                <span className="rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600">Limited Time</span>
              </div>

              <div className="-mx-1 flex gap-4 overflow-x-auto px-1 pb-2">
                {dealsProducts.map((deal) => {
                  const discountPercent = Math.round(((deal.originalPrice - deal.price) / deal.originalPrice) * 100)
                  return (
                    <article
                      key={deal.id}
                      className="min-w-[220px] rounded-2xl border border-slate-200 bg-slate-50 p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="relative overflow-hidden rounded-xl">
                        <img src={deal.image} alt={deal.name} className="h-48 w-full object-cover" loading="lazy" />
                        <span className="absolute left-2 top-2 rounded-md bg-rose-600 px-2 py-1 text-xs font-bold text-white">
                          {discountPercent}% OFF
                        </span>
                      </div>
                      <p className="mt-3 line-clamp-1 text-sm font-bold text-slate-900">{deal.name}</p>
                      <div className="mt-1 flex items-center gap-2">
                        <span className="text-lg font-black text-slate-900">{formatCurrency(deal.price)}</span>
                        <span className="text-sm text-slate-400 line-through">{formatCurrency(deal.originalPrice)}</span>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Trending Now</p>
                  <h2 className="text-2xl font-black text-slate-900">Top Picks Across OutfitHub</h2>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(setSelectedCategory('Men'))}
                  className="rounded-full border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  View all products
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {trendingProducts.map((product) => {
                  const discountPercent = Math.round(
                    ((product.originalPrice - product.price) / product.originalPrice) * 100,
                  )

                  return (
                    <button
                      key={product.id}
                      type="button"
                      onClick={() => dispatch(setSelectedCategory(product.category))}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="relative overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          loading="lazy"
                          className="h-48 w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                        <span className="absolute left-2 top-2 rounded-md bg-amber-400 px-2 py-1 text-[11px] font-bold text-slate-900">
                          Trending
                        </span>
                      </div>
                      <div className="p-3">
                        <p className="line-clamp-1 text-sm font-semibold text-slate-900">{product.name}</p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-amber-500">
                          <FontAwesomeIcon icon={faStar} className="h-3 w-3" />
                          <span className="font-semibold text-slate-700">{product.rating}</span>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-base font-black text-slate-900">{formatCurrency(product.price)}</span>
                          <span className="text-xs text-slate-400 line-through">{formatCurrency(product.originalPrice)}</span>
                        </div>
                        <p className="mt-1 text-xs font-bold text-rose-600">Save {discountPercent}%</p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </section>
          </>
        ) : (
          <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
            <FilterSidebar
              isMobileOpen={filtersOpen}
              onCloseMobile={() => dispatch(closeFilters())}
              maxPrice={maxPrice}
              colors={availableColors}
              filters={filters}
              onPriceChange={(range) => dispatch(setPriceRange(range))}
              onToggleSize={(size) => dispatch(toggleSize(size))}
              onToggleColor={(color) => dispatch(toggleColor(color))}
              onToggleRating={(rating) => dispatch(toggleRating(rating))}
              onReset={() => dispatch(resetFilters())}
            />

            <section>
              <div className="mb-4 flex items-center justify-between rounded-3xl bg-white p-4 shadow-sm">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">Browsing</p>
                  <h2 className="text-2xl font-black text-slate-900">{selectedCategory}</h2>
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(clearSelectedCategory())}
                  className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Back to categories
                </button>
              </div>

              <SortBar
                sortBy={sortBy}
                onSortChange={(value) => dispatch(setSortBy(value))}
                totalItems={filteredProducts.length}
                onOpenFilters={toggleMobileFilters}
              />

              <div className="mb-4 rounded-2xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm text-blue-700">
                Showing products for <span className="font-bold">{selectedCategory}</span>. Search, sort, and filters are
                ready. Prices are displayed in <span className="font-bold">₹</span>.
              </div>

              <ProductGrid
                products={displayedProducts}
                loading={status === 'loading'}
                canLoadMore={canLoadMore}
                onLoadMore={() => dispatch(loadMore())}
                wishlist={new Set(wishlistItems)}
                onToggleWishlist={(productId) => dispatch(toggleWishlist(productId))}
                onAddToCart={(productId) => dispatch(addToCart(productId))}
              />
            </section>
          </div>
        )}
      </main>
    </div>
  )
}