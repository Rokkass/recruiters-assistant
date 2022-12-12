import React from 'react';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { handleSemesterChangeFn } from '../features/semesterSlice';
import {
  handleFetchDataFn,
  handleQuizChangeFn,
  handleAnswer,
  checkAnswers,
  clearForm,
} from '../features/quizSlice';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

interface Question {
  a: string;
  answer: string;
  b: string;
  c: string;
  content: string;
  d: string;
  id: string;
}

function Home() {
  const { topic } = useSelector((store: any) => store.semester);
  const quiz = useSelector((store: any) => store.quiz);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const colRef = collection(db, topic ? topic : 'egzamin-inz-sem1');
      const data = await getDocs(colRef);
      let questions: { id: string }[] = [];
      data.docs.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() });
      });
      dispatch(handleFetchDataFn(questions));
    } catch (e) {
      console.error('Error fetching api data', e);
    }
  };

  function startQuiz(e: React.SyntheticEvent) {
    e.preventDefault();
    getData();
  }

  return (
    <div className={styles.home__container}>
      {quiz.questionsArray.length > 1 ? (
        <div className={styles.quiz__container}>
          {quiz.questionsArray.map((item: Question, id: number) => (
            <div key={id} className={styles.question__container}>
              <p>{item.content}</p>
              {item.a === quiz.userAnswers[id] ? (
                <button
                  className={styles.active}
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.a }))
                  }
                >
                  {item.a}
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.a }))
                  }
                >
                  {item.a}
                </button>
              )}
              {item.b === quiz.userAnswers[id] ? (
                <button
                  className={styles.active}
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.b }))
                  }
                >
                  {item.b}
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.b }))
                  }
                >
                  {item.b}
                </button>
              )}
              {item.c === quiz.userAnswers[id] ? (
                <button
                  className={styles.active}
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.c }))
                  }
                >
                  {item.c}
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.c }))
                  }
                >
                  {item.c}
                </button>
              )}
              {item.d === quiz.userAnswers[id] ? (
                <button
                  className={styles.active}
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.d }))
                  }
                >
                  {item.d}
                </button>
              ) : (
                <button
                  onClick={() =>
                    dispatch(handleAnswer({ id: id, answer: item.d }))
                  }
                >
                  {item.d}
                </button>
              )}
            </div>
          ))}
          <button
            className={styles.send__answers}
            onClick={() => dispatch(checkAnswers())}
          >
            Done
          </button>
        </div>
      ) : quiz.questionsArray.length < 2 && quiz.userAnswers.length > 0 ? (
        <div className={styles.end__view}>
          <h1>Your score is: {quiz.score}</h1>
          <button
            onClick={() => dispatch(clearForm())}
            className={[styles.end__button, styles.home__button].join(' ')}
          >
            End quiz
          </button>
        </div>
      ) : (
        <div className={styles.form__container}>
          <h1>Recruiter's assistant</h1>
          <h3>Choose a topic:</h3>
          <form onSubmit={startQuiz} className={styles.start__form}>
            <select
              value={topic}
              onChange={(e) => dispatch(handleSemesterChangeFn(e.target.value))}
            >
              <option value="egzamin-inz-sem1">Semestr 1</option>
              <option value="egzamin-inz-sem2">Semestr 2</option>
              <option value="egzamin-inz-sem3">Semestr 3</option>
              <option value="egzamin-inz-sem4">Semestr 4</option>
              <option value="egzamin-inz-sem5">Semestr 5</option>
              <option value="egzamin-inz-sem6">Semestr 6</option>
            </select>
            <input
              type="text"
              name="securityCode"
              onChange={(e) =>
                dispatch(
                  handleQuizChangeFn({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              placeholder="Security code"
            />
            <input
              type="text"
              name="candidateEmail"
              onChange={(e) =>
                dispatch(
                  handleQuizChangeFn({
                    name: e.target.name,
                    value: e.target.value,
                  })
                )
              }
              placeholder="E-mail"
              required
            />
            <button
              className={[styles.start__button, styles.home__button].join(' ')}
            >
              Start
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Home;
