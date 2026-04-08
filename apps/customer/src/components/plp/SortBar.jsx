import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSliders } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

export const SortBar = ({ sortBy, onSortChange, totalItems, onOpenFilters }) => {
  return (
    <div className="mb-4 flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
        <FontAwesomeIcon icon={faSort} className="h-4 w-4" />
        <span>{totalItems} products found</span>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="lg:hidden" onClick={onOpenFilters}>
          <FontAwesomeIcon icon={faSliders} className="h-4 w-4" />
          Filters
        </Button>

        <div className="flex min-w-[220px] items-center gap-2 text-sm">
          <span className="hidden text-slate-500 sm:inline">Sort by</span>
          <Select value={sortBy} onValueChange={onSortChange}>
            <SelectTrigger>
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price_low_high">Price: Low to High</SelectItem>
              <SelectItem value="price_high_low">Price: High to Low</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
