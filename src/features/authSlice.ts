import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  user: '',
  codes: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleAuthInputChange: (
      state,
      action: { payload: { name: string; value: string } }
    ) => {
      const { name, value } = action.payload;
      return {
        ...state,
        [name as keyof typeof state]: value,
      };
    },
    clearAuthForm: (state) => {
      return {
        ...state,
        email: '',
        password: '',
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      return {
        ...state,
        user: '',
        codes: [],
      };
    },
    setCodes: (state, action) => {
      return {
        ...state,
        codes: action.payload,
      };
    },
  },
});

export const {
  handleAuthInputChange,
  clearAuthForm,
  setUser,
  removeUser,
  setCodes,
} = authSlice.actions;

export default authSlice.reducer;
