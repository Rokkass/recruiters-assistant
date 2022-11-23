import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
};

const confirmSlice = createSlice({
  name: 'confirm',
  initialState,
  reducers: {
    toggleConfirm: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeConfirm: (state) => {
      state.isOpen = false;
    },
  },
});

export const { toggleConfirm, closeConfirm } = confirmSlice.actions;

export default confirmSlice.reducer;
