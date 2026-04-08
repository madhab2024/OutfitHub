import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cartSlice'
import catalogReducer from './catalogSlice'
import uiReducer from './uiSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    ui: uiReducer,
    cart: cartReducer,
  },
})