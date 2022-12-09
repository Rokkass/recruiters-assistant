import styles from './Dashboard.module.scss';
import React from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { toggleConfirm } from '../features/confirmSlice';
import Input from '../components/Input/Input';
import { clearForm } from '../features/dashboardSlice';
import { handleSemesterChangeFn } from '../features/semesterSlice';
import { clearAuthForm, setUser, removeUser } from '../features/authSlice';

function Dashboard() {
  const { isOpen } = useSelector((store: any) => store.confirm);
  const { semester } = useSelector((store: any) => store.semester);
  const authData = useSelector((store: any) => store.auth);
  const question = useSelector((store: any) => store.dashboard);
  const dispatch = useDispatch();
  const auth = getAuth();

  function addQuestion(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const colRef = collection(db, semester.value);
    addDoc(colRef, question).then(() => {
      dispatch(clearForm());
      dispatch(toggleConfirm());
    });
  }

  function signIn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    signInWithEmailAndPassword(auth, authData.email, authData.password)
      .then((res) => {
        dispatch(setUser(res.user.email));
        dispatch(clearAuthForm());
      })
      .catch((err) => alert(err.message));
  }

  function signOutUser() {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
      })
      .catch((err) => {
        alert(err.message);
      });
  }
  // TODO: Generating tests
  // function generateTest(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  // }

  function closeModalFn() {
    dispatch(toggleConfirm());
  }

  return (
    <div className={styles.dashboard__container}>
      <h4 className={styles.dashboard__header}></h4>
      {!auth.currentUser && (
        <form onSubmit={signIn} className={styles.form}>
          <Input
            type="email"
            name="email"
            placeholder="example@gmail.com"
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="********"
            required
          />
          <button type="submit" className={styles.dashboard__button}>
            Sign in
          </button>
        </form>
      )}
      {/*TODO: Generating tests*/}
      {/*{auth.currentUser && (*/}
      {/*  <div className={styles.dashboard__container}>*/}
      {/*    <h4 className={styles.dashboard__header}></h4>*/}
      {/*    <form onSubmit={generateTest} className={styles.form}>*/}
      {/*      <select*/}
      {/*        value={semester.value}*/}
      {/*        onChange={(e) =>*/}
      {/*          dispatch(handleSemesterChangeFn({ value: e.target.value }))*/}
      {/*        }*/}
      {/*        className={styles.form__select}*/}
      {/*      >*/}
      {/*        <option value="egzamin-inz-sem1">Semestr 1</option>*/}
      {/*        <option value="egzamin-inz-sem2">Semestr 2</option>*/}
      {/*        <option value="egzamin-inz-sem3">Semestr 3</option>*/}
      {/*        <option value="egzamin-inz-sem4">Semestr 4</option>*/}
      {/*        <option value="egzamin-inz-sem5">Semestr 5</option>*/}
      {/*        /!*<option value="egzamin-inz-sem6">Semestr 6</option>*!/*/}
      {/*      </select>*/}
      {/*      <button type="submit" className={styles.dashboard__button}>*/}
      {/*        Generate*/}
      {/*      </button>*/}
      {/*    </form>*/}
      {/*  </div>*/}
      {/*)}*/}
      {auth.currentUser && (
        <div className={styles.dashboard__container}>
          {isOpen && (
            <div className={styles.modal}>
              <h2>Success!</h2>
              <div className={styles.close} onClick={closeModalFn}></div>
            </div>
          )}
          <h4 className={styles.dashboard__header}>Add question</h4>
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
              {/*<option value="egzamin-inz-sem6">Semestr 6</option>*/}
            </select>
            <Input
              type="text"
              name="question"
              placeholder="Question"
              required
            />
            <Input type="text" name="a" placeholder="Answer a" required />
            <Input type="text" name="b" placeholder="Answer b" required />
            <Input type="text" name="c" placeholder="Answer c" required />
            <Input type="text" name="d" placeholder="Answer d" required />
            <Input
              type="text"
              name="answer"
              placeholder="Correct answer"
              required
            />
            <button type="submit" className={styles.dashboard__button}>
              Send
            </button>
          </form>
        </div>
      )}
      {auth.currentUser && (
        <button
          onClick={signOutUser}
          className={[styles.dashboard__button, styles.logOut__button].join(
            ' '
          )}
        >
          Log out
        </button>
      )}
    </div>
  );
}

export default Dashboard;
