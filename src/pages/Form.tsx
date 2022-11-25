import styles from './Form.module.scss';
import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { toggleConfirm } from '../features/confirmSlice';
import Input from '../components/Input/Input';
import { clearForm } from '../features/formSlice';
import { handleSemesterChangeFn } from '../features/semesterSlice';

function Form() {
  const { isOpen } = useSelector((store: any) => store.confirm);
  const question = useSelector((store: any) => store.form);
  const { semester } = useSelector((store: any) => store.semester);
  const dispatch = useDispatch();
  console.log(semester);

  function addQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(semester);
    console.log(question);
    const colRef = collection(db, semester.value);
    addDoc(colRef, question).then(() => {
      dispatch(clearForm());
      dispatch(toggleConfirm());
    });
  }

  function closeModalFn() {
    dispatch(toggleConfirm());
  }

  return (
    <div className={styles.form__container}>
      {isOpen && (
        <div className={styles.modal}>
          <h2>Success!</h2>
          <div className={styles.close} onClick={closeModalFn}></div>
        </div>
      )}
      <h4>Add question</h4>
      <form onSubmit={addQuestion} className={styles.form}>
        <select
          value={semester.value}
          onChange={(e) =>
            dispatch(handleSemesterChangeFn({ value: e.target.value }))
          }
          className={styles.form__select}
        >
          <option value="egzamin-inz-sem1">Semestr 1</option>
          <option value="egzamin-inz-sem2">Semestr 2</option>
          <option value="egzamin-inz-sem3">Semestr 3</option>
          <option value="egzamin-inz-sem4">Semestr 4</option>
          <option value="egzamin-inz-sem5">Semestr 5</option>
          <option value="egzamin-inz-sem6">Semestr 6</option>
        </select>
        <Input
          type="text"
          name="question"
          placeholder="Question"
          required={true}
        />
        <Input type="text" name="a" placeholder="Answer a" required={true} />
        <Input type="text" name="b" placeholder="Answer b" required />
        <Input type="text" name="c" placeholder="Answer c" required />
        <Input type="text" name="d" placeholder="Answer d" required />
        <Input
          type="text"
          name="answer"
          placeholder="Correct answer"
          required
        />
        <button type="submit" className={styles.form__submit}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Form;
