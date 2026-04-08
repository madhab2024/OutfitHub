import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { fetchProducts } from '../lib/productApi'

export const loadProducts = createAsyncThunk('catalog/loadProducts', async () => {
  return fetchProducts()
})

const initialState = {
  items: [],
  status: 'idle',
  error: null,
}

const catalogSlice = createSlice({
  name: 'catalog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(loadProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message || 'Failed to load products'
      })
  },
})

export default catalogSlice.reducer