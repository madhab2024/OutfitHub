import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { cn } from '../../lib/utils'

export const CategoryBar = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-[1280px] overflow-x-auto px-3 py-3 sm:px-6">
        <div className="flex min-w-max gap-2">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => onCategoryChange(category.value)}
              className={cn(
                'group flex min-w-[86px] flex-col items-center gap-2 rounded-2xl px-3 py-3 text-sm font-semibold whitespace-nowrap transition',
                activeCategory === category.value
                  ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-200'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
              )}
            >
              <span
                className={cn(
                  'flex h-10 w-10 items-center justify-center rounded-full transition',
                  activeCategory === category.value ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700',
                )}
              >
                <FontAwesomeIcon icon={category.icon} className="h-4 w-4" />
              </span>
              <span className="text-xs font-bold">{category.label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
