import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  selectedCategory: null,
  search: '',
  sortBy: 'popular',
  filters: {
    price: [0, 3000],
    sizes: [],
    colors: [],
    ratings: [],
  },
  visibleCount: 8,
  mobileFiltersOpen: false,
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setSelectedCategory(state, action) {
      state.selectedCategory = action.payload
      state.visibleCount = 8
    },
    clearSelectedCategory(state) {
      state.selectedCategory = null
      state.visibleCount = 8
    },
    setSearch(state, action) {
      state.search = action.payload
      state.visibleCount = 8
    },
    setSortBy(state, action) {
      state.sortBy = action.payload
      state.visibleCount = 8
    },
    setPriceRange(state, action) {
      state.filters.price = action.payload
      state.visibleCount = 8
    },
    toggleSize(state, action) {
      const size = action.payload
      state.filters.sizes = state.filters.sizes.includes(size)
        ? state.filters.sizes.filter((item) => item !== size)
        : [...state.filters.sizes, size]
      state.visibleCount = 8
    },
    toggleColor(state, action) {
      const color = action.payload
      state.filters.colors = state.filters.colors.includes(color)
        ? state.filters.colors.filter((item) => item !== color)
        : [...state.filters.colors, color]
      state.visibleCount = 8
    },
    toggleRating(state, action) {
      const rating = action.payload
      state.filters.ratings = state.filters.ratings.includes(rating)
        ? state.filters.ratings.filter((item) => item !== rating)
        : [...state.filters.ratings, rating]
      state.visibleCount = 8
    },
    resetFilters(state) {
      state.filters.sizes = []
      state.filters.colors = []
      state.filters.ratings = []
      state.visibleCount = 8
    },
    loadMore(state) {
      state.visibleCount += 8
    },
    openFilters(state) {
      state.mobileFiltersOpen = true
    },
    closeFilters(state) {
      state.mobileFiltersOpen = false
    },
  },
})

export const {
  setSelectedCategory,
  clearSelectedCategory,
  setSearch,
  setSortBy,
  setPriceRange,
  toggleSize,
  toggleColor,
  toggleRating,
  resetFilters,
  loadMore,
  openFilters,
  closeFilters,
} = uiSlice.actions

export default uiSlice.reducer