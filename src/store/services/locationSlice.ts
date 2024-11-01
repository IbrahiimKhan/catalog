import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    latitude: null,
    longitude: null,
  },
  reducers: {
    setLocation(state, action) {
      state.latitude = action.payload.latitude;
      state.longitude = action.payload.longitude;
    },
    clearLocation(state) {
      state.latitude = null;
      state.longitude = null;
    },
  },
});

export const { setLocation, clearLocation } = locationSlice.actions;
export default locationSlice.reducer;
