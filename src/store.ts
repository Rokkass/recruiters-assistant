import { configureStore } from '@reduxjs/toolkit';
import formReducer from './features/formSlice';
import confirmReducer from './features/confirmSlice';
import semesterReducer from './features/semesterSlice';
import quizReducer from './features/quizSlice';
export const store = configureStore({
  reducer: {
    form: formReducer,
    confirm: confirmReducer,
    semester: semesterReducer,
    quiz: quizReducer,
  },
  devTools: false,
});
