import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  question: '',
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

const formSlice = createSlice({
  name: 'form',
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

export const { handleInputChangeFn, clearForm } = formSlice.actions;
export default formSlice.reducer;
