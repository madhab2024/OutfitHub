import { X } from 'lucide-react'

import { Button } from '../ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Checkbox } from '../ui/checkbox'
import { Input } from '../ui/input'

const sizeOptions = ['S', 'M', 'L', 'XL']
const ratingOptions = [4, 3, 2]

export const FilterSidebar = ({
  isMobileOpen,
  onCloseMobile,
  maxPrice,
  colors,
  filters,
  onPriceChange,
  onToggleSize,
  onToggleColor,
  onToggleRating,
  onReset,
}) => {
  return (
    <>
      {isMobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          aria-label="Close filters"
          onClick={onCloseMobile}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-40 h-full w-[290px] border-r border-slate-200 bg-white p-4 shadow-xl transition-transform lg:static lg:z-auto lg:h-auto lg:w-full lg:translate-x-0 lg:rounded-lg lg:border lg:p-0 lg:shadow-none ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Card className="h-full border-none shadow-none lg:border lg:shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Filters</CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={onReset}>
                Clear
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden" onClick={onCloseMobile}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <section>
              <h4 className="mb-3 text-sm font-bold text-slate-800">Price Range</h4>
              <div className="space-y-3">
                <Input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.price[0]}
                  onChange={(event) => onPriceChange([Number(event.target.value), filters.price[1]])}
                />
                <Input
                  type="range"
                  min={0}
                  max={maxPrice}
                  value={filters.price[1]}
                  onChange={(event) => onPriceChange([filters.price[0], Number(event.target.value)])}
                />
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>₹{filters.price[0].toLocaleString('en-IN')}</span>
                  <span>₹{filters.price[1].toLocaleString('en-IN')}</span>
                </div>
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-sm font-bold text-slate-800">Size</h4>
              <div className="space-y-2">
                {sizeOptions.map((size) => (
                  <label key={size} className="flex items-center gap-2 text-sm text-slate-700">
                    <Checkbox
                      checked={filters.sizes.includes(size)}
                      onCheckedChange={() => onToggleSize(size)}
                    />
                    {size}
                  </label>
                ))}
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-sm font-bold text-slate-800">Color</h4>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  const checked = filters.colors.includes(color)
                  return (
                    <button
                      key={color}
                      type="button"
                      onClick={() => onToggleColor(color)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                        checked
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-slate-300 text-slate-600 hover:border-slate-400'
                      }`}
                    >
                      {color}
                    </button>
                  )
                })}
              </div>
            </section>

            <section>
              <h4 className="mb-3 text-sm font-bold text-slate-800">Rating</h4>
              <div className="space-y-2">
                {ratingOptions.map((rating) => (
                  <label key={rating} className="flex items-center gap-2 text-sm text-slate-700">
                    <Checkbox
                      checked={filters.ratings.includes(rating)}
                      onCheckedChange={() => onToggleRating(rating)}
                    />
                    {rating} star and above
                  </label>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>
      </aside>
    </>
  )
}