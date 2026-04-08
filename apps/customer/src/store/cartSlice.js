import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [], // Array of { id, quantity }
  wishlistItems: [], // Array of product IDs
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const productId = action.payload
      const existingItem = state.cartItems.find((item) => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.cartItems.push({ id: productId, quantity: 1 })
      }
    },
    removeFromCart(state, action) {
      const productId = action.payload
      state.cartItems = state.cartItems.filter((item) => item.id !== productId)
    },
    updateQuantity(state, action) {
      const { productId, quantity } = action.payload
      const item = state.cartItems.find((item) => item.id === productId)
      if (item && quantity > 0) {
        item.quantity = quantity
      }
    },
    clearCart(state) {
      state.cartItems = []
    },
    toggleWishlist(state, action) {
      const productId = action.payload
      state.wishlistItems = state.wishlistItems.includes(productId)
        ? state.wishlistItems.filter((item) => item !== productId)
        : [...state.wishlistItems, productId]
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleWishlist } = cartSlice.actions

export default cartSlice.reducer