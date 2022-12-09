import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  password: '',
  user: '',
};

interface Action {
  name: string;
  value: string;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    handleAuthInputChange: (state, action) => {
      const { name, value }: Action = action.payload;
      state[name as keyof typeof state] = value;
    },
    clearAuthForm: (state) => {
      state = {
        ...state,
        email: '',
        password: '',
      };
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = '';
    },
  },
});

export const { handleAuthInputChange, clearAuthForm, setUser, removeUser } =
  authSlice.actions;

export default authSlice.reducer;
