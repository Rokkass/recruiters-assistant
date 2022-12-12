import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styles from './Home.module.scss';
import { db } from '../firebaseConfig';

function Home() {
  const [currentSemester, setCurrentSemester] =
    useState<string>('egzamin-inz-sem1');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    getData();
  }, [currentSemester]);

  const getData = async () => {
    try {
      const colRef = collection(db, currentSemester);
      const data = await getDocs(colRef);
      let questions: { id: string }[] = [];
      data.docs.forEach((doc) => {
        questions.push({ id: doc.id, ...doc.data() });
      });
      console.log(questions);
      setData(questions);
    } catch (e) {
      console.error('Error fetching api data', e);
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setCurrentSemester(value);
    console.log(value);
  }

  const questions = data.map((question, id) => (
    <div key={id}>
      <h4>Question {id}</h4>
      <details className={styles.details}>
        <summary>{question.content}</summary>
        <p>{question.a}</p>
        <p>{question.b}</p>
        <p>{question.c}</p>
        <p>{question.d}</p>
        <p>
          ODPOWIEDŹ: <b>{question.answer}</b>
        </p>
      </details>
    </div>
  ));

  return (
    <>
      <h1>Quiz!</h1>
      <form>
        <select value={currentSemester} onChange={handleChange}>
          <option value="egzamin-inz-sem1">Semestr 1</option>
          <option value="egzamin-inz-sem2">Semestr 2</option>
          <option value="egzamin-inz-sem3">Semestr 3</option>
          <option value="egzamin-inz-sem4">Semestr 4</option>
          <option value="egzamin-inz-sem5">Semestr 5</option>
          {/*<option value="egzamin-inz-sem6">Semestr 6</option>*/}
          <option value="frontend-junior">Frontend Junior</option>
          <option value="frontend-regular">Frontend Regular</option>
        </select>
      </form>
      {/*<button onClick={startQuiz}>Start</button>*/}
      <div>{questions}</div>
      {/*{data.map((question) => (*/}
      {/*  <h1>question</h1>*/}
      {/*))}*/}
    </>
  );
}

export default Home;
