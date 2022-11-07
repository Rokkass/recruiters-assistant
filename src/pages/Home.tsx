import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useState } from 'react';

function Home() {
  const [quizStart, setQuizStart] = useState<boolean>(false);

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
  const colRef = collection(db, 'frontend-junior');

  // get collection data
  getDocs(colRef).then((snapshot) => {
    let questions: { id: string }[] = [];
    snapshot.docs.forEach((doc) => {
      questions.push({ id: doc.id, ...doc.data() });
      console.log(questions);
    });
  });

  function startQuiz() {
    setQuizStart((prev) => !prev);
  }

  return (
    <>
      <h1>Start quiz!</h1>
      <button onClick={startQuiz}>Start</button>
      {quizStart && (
        <>
          <h2>Pytanie</h2>
          <ul>
            <li>odpowiedź</li>
          </ul>
        </>
      )}
    </>
  );
}

export default Home;
