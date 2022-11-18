import React, { useState } from 'react';
import styles from './Home.module.scss';

function Home() {
  const [quizStart, setQuizStart] = useState<boolean>(false);
  const [currentSemester, setCurrentSemester] =
    useState<string>('egzamin-inz-sem1');
  const [data, setData] = useState<any[]>([]);

  function startQuiz() {
    setQuizStart((prev) => !prev);
  }

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
      <h1>Pomocnik rekrutera</h1>
      <h3>Wybierz tematykę:</h3>
      <form className={styles.form}>
        <select value={currentSemester} onChange={handleChange}>
          <option value="egzamin-inz-sem1">Semestr 1</option>
          <option value="egzamin-inz-sem2">Semestr 2</option>
          <option value="egzamin-inz-sem3">Semestr 3</option>
          <option value="egzamin-inz-sem3">Semestr 4</option>
          <option value="egzamin-inz-sem3">Semestr 5</option>
          <option value="egzamin-inz-sem3">Semestr 6</option>
        </select>
        <input type="text" placeholder="Kod bezpieczeństwa" />
        <input type="text" placeholder="E-mail" />
        <button onClick={startQuiz}>Start</button>
      </form>
      {/*{data.map((question) => (*/}
      {/*  <h1>question</h1>*/}
      {/*))}*/}
    </>
  );
}

export default Home;
