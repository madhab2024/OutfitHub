import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './cartSlice'
import catalogReducer from './catalogSlice'
import uiReducer from './uiSlice'
import addressReducer from './addressSlice'

export const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    ui: uiReducer,
    cart: cartReducer,
    address: addressReducer,
  },
})