import React from 'react';
import styles from './Home.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleFetchDataFn,
  handleQuizChangeFn,
  handleAnswer,
  clearForm,
  handleTopic,
  toggleLoading,
  togglePage,
} from '../features/quizSlice';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from 'firebase/firestore';
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
  const quiz = useSelector((store: any) => store.quiz);
  const dispatch = useDispatch();
  const getData = async () => {
    try {
      dispatch(toggleLoading());
      const snap = await getDoc(doc(db, 'tests-id', quiz.securityCode));
      let info: any = [];
      if (snap.exists()) {
        info.push(snap.data());
        dispatch(handleTopic(info[0]));

        if (snap.data().score === -1) {
          const colRef = collection(db, snap.data().topic);
          const data = await getDocs(colRef);
          let questions: { id: string }[] = [];
          data.docs.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
          });

          // Marking that the test has been started
          sendAnswers(-2);

          dispatch(togglePage('quiz'));
          dispatch(handleFetchDataFn(questions));
        } else {
          console.log('Test already finished!');
          dispatch(clearForm());
        }
        dispatch(toggleLoading());
      } else {
        console.log('No such document!');
      }
    } catch (e) {
      console.error('Error fetching api data', e);
    }
  };
  function startQuiz(e: React.SyntheticEvent) {
    e.preventDefault();
    getData();
  }
  function sendAnswers(start?: number) {
    let dataToUpdate = doc(db, 'tests-id', quiz.securityCode);
    updateDoc(dataToUpdate, { score: start === -2 ? start : quiz.score })
      .then(() => {
        start !== -2 && dispatch(togglePage('score'));
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }

  return (
    <div className={styles.home__container}>
      {quiz.page === 'quiz' ? (
        <div className={styles.quiz__container}>
          {quiz.loading ? (
            <h1>Loading...</h1>
          ) : (
            <h1>Candidate: {quiz.candidatesEmail}</h1>
          )}
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
          {quiz.loading === false && (
            <button
              className={styles.send__answers}
              onClick={() => sendAnswers()}
            >
              Send answers
            </button>
          )}
        </div>
      ) : quiz.page === 'score' ? (
        <div className={styles.end__view}>
          <h1>Your score is: {quiz.score}/6</h1>
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
          <form onSubmit={startQuiz} className={styles.start__form}>
            {/*<label htmlFor="topic" className={styles.input__label}>*/}
            {/*  Choose a topic:*/}
            {/*</label>*/}
            {/*<select*/}
            {/*  value={topic}*/}
            {/*  name="topic"*/}
            {/*  onChange={(e) => dispatch(handleSemesterChangeFn(e.target.value))}*/}
            {/*>*/}
            {/*  <option value="egzamin-inz-sem1">Semestr 1</option>*/}
            {/*  <option value="egzamin-inz-sem2">Semestr 2</option>*/}
            {/*  <option value="egzamin-inz-sem3">Semestr 3</option>*/}
            {/*  <option value="egzamin-inz-sem4">Semestr 4</option>*/}
            {/*  <option value="egzamin-inz-sem5">Semestr 5</option>*/}
            {/*  <option value="egzamin-inz-sem6">Semestr 6</option>*/}
            {/*</select>*/}
            <label htmlFor="securityCode" className={styles.input__label}>
              Enter code:
            </label>
            <input
              type="text"
              name="securityCode"
              value={quiz.securityCode}
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
            {/*<input*/}
            {/*  type="text"*/}
            {/*  name="candidateEmail"*/}
            {/*  onChange={(e) =>*/}
            {/*    dispatch(*/}
            {/*      handleQuizChangeFn({*/}
            {/*        name: e.target.name,*/}
            {/*        value: e.target.value,*/}
            {/*      })*/}
            {/*    )*/}
            {/*  }*/}
            {/*  placeholder="E-mail"*/}
            {/*  required*/}
            {/*/>*/}
            <button
              className={[styles.start__button, styles.home__button].join(' ')}
              disabled={quiz.loading === true}
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
