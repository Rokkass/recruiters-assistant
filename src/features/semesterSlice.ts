import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  semester: 'egzamin-inz-sem1',
};

const semesterSlice = createSlice({
  name: 'semester',
  initialState,
  reducers: {
    handleSemesterChangeFn: (state, action) => {
      state.semester = action.payload;
    },
  },
});

export const { handleSemesterChangeFn } = semesterSlice.actions;

export default semesterSlice.reducer;
