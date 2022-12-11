import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  semester: 'egzamin-inz-sem1',
  candidatesEmail: '',
};

const semesterSlice = createSlice({
  name: 'semester',
  initialState,
  reducers: {
    handleSemesterChangeFn: (state, action) => {
      state.semester = action.payload;
    },
    handleEmailChangeFn: (state, action) => {
      state.candidatesEmail = action.payload;
    },
    clearGenerateForm: (state) => {
      state.candidatesEmail = '';
    },
  },
});

export const {
  handleSemesterChangeFn,
  handleEmailChangeFn,
  clearGenerateForm,
} = semesterSlice.actions;

export default semesterSlice.reducer;
