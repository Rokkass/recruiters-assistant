import styles from './Form.module.scss';
import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

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

  function addQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
          onChange={(e) => handleInputChange(e)}
          placeholder="Question"
          required
        />
        <input
          type="text"
          name="a"
          value={formData.a}
          placeholder="Answer a"
          required
        />
        <input
          type="text"
          name="b"
          value={formData.b}
          onChange={(e) => handleInputChange(e)}
          placeholder="Answer b"
          required
        />
        <input
          type="text"
          name="c"
          value={formData.c}
          onChange={(e) => handleInputChange(e)}
          placeholder="Answer c"
          required
        />
        <input
          type="text"
          name="d"
          value={formData.d}
          onChange={(e) => handleInputChange(e)}
          placeholder="Answer d"
        />
        <input
          type="text"
          name="answer"
          value={formData.answer}
          onChange={(e) => handleInputChange(e)}
          placeholder="Correct answer"
          required
        />
        <button type="submit">Wyślij</button>
      </form>
    </>
  );
}

export default Form;
