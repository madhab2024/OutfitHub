import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  addresses: [
    {
      id: 'addr-1',
      receiverName: 'Madhab Mondal',
      phone: '9876543210',
      houseName: 'Green View Apt, 402',
      address: '123 Fashion Street, Cyber City, Bangalore, 560001',
      isDefault: true,
      label: 'Home'
    }
  ],
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    addAddress: (state, action) => {
      const newAddress = {
        ...action.payload,
        id: `addr-${Date.now()}`,
        isDefault: state.addresses.length === 0 ? true : action.payload.isDefault || false
      };
      
      if (newAddress.isDefault) {
        state.addresses = state.addresses.map(addr => ({ ...addr, isDefault: false }));
      }
      
      state.addresses.push(newAddress);
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex(addr => addr.id === action.payload.id);
      if (index !== -1) {
        if (action.payload.isDefault) {
          state.addresses = state.addresses.map(addr => ({ ...addr, isDefault: false }));
        }
        state.addresses[index] = { ...state.addresses[index], ...action.payload };
      }
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter(addr => addr.id !== action.payload);
      if (state.addresses.length > 0 && !state.addresses.some(addr => addr.isDefault)) {
        state.addresses[0].isDefault = true;
      }
    },
    setDefaultAddress: (state, action) => {
      state.addresses = state.addresses.map(addr => ({
        ...addr,
        isDefault: addr.id === action.payload
      }));
    }
  },
});

export const { addAddress, updateAddress, deleteAddress, setDefaultAddress } = addressSlice.actions;
export default addressSlice.reducer;
