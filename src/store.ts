import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './features/dashboardSlice';
import confirmReducer from './features/confirmSlice';
import semesterReducer from './features/semesterSlice';
import quizReducer from './features/quizSlice';
import authReducer from './features/authSlice';
export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    confirm: confirmReducer,
    semester: semesterReducer,
    quiz: quizReducer,
  },
  devTools: true,
});
