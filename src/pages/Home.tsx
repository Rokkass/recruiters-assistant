import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import styles from './Home.module.scss';

function Home() {
  const [quizStart, setQuizStart] = useState<boolean>(false);
  const [currentSemester, setCurrentSemester] =
    useState<string>('egzamin-inz-sem1');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      try {
        // For Firebase JS SDK v7.20.0 and later, measurementId is optional
        const firebaseConfig = {
          apiKey: 'AIzaSyA-Fmx7u8ETJoPggb36U4MUoue0zYEeQDc',
          authDomain: 'recruiters-assistant.firebaseapp.com',
          projectId: 'recruiters-assistant',
          storageBucket: 'recruiters-assistant.appspot.com',
          messagingSenderId: '303073489399',
          appId: '1:303073489399:web:1718823450cbcff11d7ef2',
          measurementId: 'G-PJMNN4PXF8',
        };
        // init firebase app
        initializeApp(firebaseConfig);
        // init services
        const db = getFirestore();
        // collection reference
        const colRef = collection(db, currentSemester);
        // get collection data
        getDocs(colRef).then((snapshot) => {
          let questions: { id: string }[] = [];
          snapshot.docs.forEach((doc) => {
            questions.push({ id: doc.id, ...doc.data() });
          });
          setData(questions);
          console.log(questions);
        });
      } catch (e) {
        console.error('Error fetching api data', e);
      }
    })();
    return () => {
      setData([]);
    };
  }, [currentSemester]);

  function startQuiz() {
    setQuizStart((prev) => !prev);
  }

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const { value } = e.target;
    setCurrentSemester(value);
    console.log(value);
  }

  function fetchData() {}

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
