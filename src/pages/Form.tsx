import styles from './Form.module.scss';
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { collection, addDoc, getFirestore } from 'firebase/firestore';

function Form() {
  const [semester, setSemester] = useState<string>('egzamin-inz-sem1');
  const [message, setMessage] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    content: '',
    a: '',
    b: '',
    c: '',
    d: '',
    answer: '',
  });

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
      } catch (e) {
        console.error('Error fetching api data', e);
      }
    })();
  }, [semester]);

  function addQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const db = getFirestore();
    const colRef = collection(db, semester);
    addDoc(colRef, formData).then(() => {
      setFormData({ content: '', a: '', b: '', c: '', d: '', answer: '' });
      setMessage(true);
    });
  }

  function handleSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSemester(e.target.value);
    console.log(formData);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setMessage(false);
  }

  function closeModalFn() {
    setMessage((prev) => !prev);
  }

  return (
    <>
      {message && (
        <div className={styles.modal}>
          <h2>Success!</h2>
          <div className={styles.close} onClick={closeModalFn}></div>
        </div>
      )}
      <h4>Dodaj pytanie</h4>
      <form onSubmit={addQuestion} className={styles.form}>
        <select value={semester} onChange={handleSelectChange}>
          <option value="egzamin-inz-sem1">Semestr 1</option>
          <option value="egzamin-inz-sem2">Semestr 2</option>
          <option value="egzamin-inz-sem3">Semestr 3</option>
          <option value="egzamin-inz-sem4">Semestr 4</option>
          <option value="egzamin-inz-sem5">Semestr 5</option>
          <option value="egzamin-inz-sem6">Semestr 6</option>
        </select>
        <input
          type="text"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Question"
          required
        />
        <input
          type="text"
          name="a"
          value={formData.a}
          onChange={handleInputChange}
          placeholder="Answer a"
          required
        />
        <input
          type="text"
          name="b"
          value={formData.b}
          onChange={handleInputChange}
          placeholder="Answer b"
          required
        />
        <input
          type="text"
          name="c"
          value={formData.c}
          onChange={handleInputChange}
          placeholder="Answer c"
          required
        />
        <input
          type="text"
          name="d"
          value={formData.d}
          onChange={handleInputChange}
          placeholder="Answer d"
          required
        />
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={handleInputChange}
          placeholder="Correct answer"
          required
        />
        <button type="submit">Wyślij</button>
      </form>
    </>
  );
}

export default Form;
