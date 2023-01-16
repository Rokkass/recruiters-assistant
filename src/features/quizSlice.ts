import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  securityCode: '',
  candidatesEmail: '',
  topic: '',
  questionsArray: <any>[],
  userAnswers: [],
  score: -1,
  loading: false,
  page: 'home',
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
    handleTopic: (state, action) => {
      const { topic, candidatesEmail } = action.payload;
      state.topic = topic;
      state.candidatesEmail = candidatesEmail;
      state.score = 0;
    },
    handleAnswer: (state, action) => {
      const { id, answer } = action.payload;
      state.questionsArray[id].answer
        ? state.userAnswers[id] === state.questionsArray[id].answer
          ? answer === state.questionsArray[id].answer
            ? state.score
            : (state.score = state.score - 1)
          : answer === state.questionsArray[id].answer
          ? (state.score = state.score + 1)
          : state.score
        : state.score;
      // @ts-ignore
      state.userAnswers[id] = answer;
    },
    checkAnswers: (state, action: { payload: { id: number } }) => {
      state.questionsArray[action.payload.id].answer
        ? (state.score = state.score + 1)
        : state.score;
    },
    // handleAnswer: (state, action) => {
    //   const { id, answer } = action.payload;
    //   // @ts-ignore
    //   state.userAnswers[id] = answer;
    // },
    // checkAnswers: (state) => {
    //   const condition: string[] = state.userAnswers.filter(
    //     (ans: any) => ans.length > 0
    //   );
    //   if (condition.length === 6) {
    //     state.score = 0;
    //     state.userAnswers.map((ans, id) =>
    //       // @ts-ignore
    //       ans === state.questionsArray[id].answer
    //         ? (state.score = state.score + 1)
    //         : state.score
    //     );
    //     state.questionsArray = [];
    //   } else {
    //     alert('Enter all answers');
    //   }
    // },
    clearForm: (state) => {
      state.userAnswers = [];
      state.score = 0;
      state.securityCode = '';
      state.page = 'home';
    },
    toggleLoading: (state) => {
      state.loading = !state.loading;
    },
    togglePage: (state, action) => {
      state.page = action.payload;
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
  handleTopic,
  toggleLoading,
  togglePage,
} = quizSlice.actions;
