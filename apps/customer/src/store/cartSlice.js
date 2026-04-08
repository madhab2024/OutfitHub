import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  wishlistItems: [],
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload)
    },
    toggleWishlist(state, action) {
      const productId = action.payload
      state.wishlistItems = state.wishlistItems.includes(productId)
        ? state.wishlistItems.filter((item) => item !== productId)
        : [...state.wishlistItems, productId]
    },
  },
})

export const { addToCart, toggleWishlist } = cartSlice.actions

export default cartSlice.reducer