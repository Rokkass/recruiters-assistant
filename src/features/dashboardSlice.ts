import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  content: '',
  a: '',
  b: '',
  c: '',
  d: '',
  answer: '',
};

interface Action {
  name: string;
  value: string;
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    handleInputChangeFn: (state, action) => {
      const { name, value }: Action = action.payload;
      state[name as keyof typeof state] = value;
    },
    clearForm: (state) => {
      return initialState;
    },
  },
});

export const { handleInputChangeFn, clearForm } = dashboardSlice.actions;
export default dashboardSlice.reducer;
