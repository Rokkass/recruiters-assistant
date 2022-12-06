import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  securityCode: '',
  candidateEmail: '',
  questionsArray: [],
  userAnswers: [],
  score: 0,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    handleQuizChangeFn: (state, action) => {
      const { name, value } = action.payload;
      // @ts-ignore
      state[name as keyof typeof state] = value;
    },
    handleFetchDataFn: (state, action) => {
      state.questionsArray = action.payload
        .sort(() => 0.5 - Math.random())
        .slice(0, 6);
    },
    handleAnswer: (state, action) => {
      const { id, answer } = action.payload;
      // @ts-ignore
      state.userAnswers[id] = answer;
    },
    checkAnswers: (state) => {
      const condition: string[] = state.userAnswers.filter(
        (ans: any) => ans.length > 0
      );
      if (condition.length === 6) {
        state.userAnswers.map((ans, id) =>
          // @ts-ignore
          ans === state.questionsArray[id].answer
            ? (state.score = state.score + 1)
            : state.score
        );
        state.questionsArray = [];
      } else {
        alert('Enter all answers');
      }
    },
    clearForm: (state) => {
      state.userAnswers = [];
      state.score = 0;
    },
  },
});

export default quizSlice.reducer;

export const {
  handleQuizChangeFn,
  handleFetchDataFn,
  handleAnswer,
  checkAnswers,
  clearForm,
} = quizSlice.actions;
