import styles from './Dashboard.module.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { toggleConfirm } from '../features/confirmSlice';
import { clearForm } from '../features/dashboardSlice';
import {
  clearGenerateForm,
  handleEmailChangeFn,
  handleSemesterChangeFn,
} from '../features/semesterSlice';
import {
  clearAuthForm,
  setUser,
  removeUser,
  setCodes,
} from '../features/authSlice';
import Input from '../components/Input/Input';
import {
  FaUserAlt,
  FaBarcode,
  FaAward,
  FaFile,
  FaTimes,
  FaSyncAlt,
} from 'react-icons/fa';

function Dashboard() {
  const { isOpen } = useSelector((store: any) => store.confirm);
  const { semester, candidatesEmail } = useSelector(
    (store: any) => store.semester
  );
  const authData = useSelector((store: any) => store.auth);
  const question = useSelector((store: any) => store.dashboard);
  const dispatch = useDispatch();
  const auth = getAuth();

  useEffect(() => {
    getCodes();
    !authData.user && signOutUser();
  }, [authData.user]);

  const getCodes = async () => {
    try {
      const q = query(
        collection(db, 'tests-id'),
        where('recruiter', '==', authData.user)
      );
      const data = await getDocs(q);
      let codes: { id: string }[] = [];
      data.docs.forEach((doc) => {
        codes.push({ id: doc.id, ...doc.data() });
      });
      dispatch(setCodes(codes));
    } catch (e) {
      console.error('Error fetching api data', e);
    }
  };
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
        dispatch(clearAuthForm());
        dispatch(setUser(res.user.email));
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
  function generateTest(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const dataToSend = {
      candidatesEmail: candidatesEmail,
      // recruiter: authData.user,
      recruiter: auth.currentUser?.email,
      score: -1,
      topic: semester,
    };
    const colRef = collection(db, 'tests-id');
    console.log(auth.currentUser);
    auth.currentUser?.email !== null &&
      addDoc(colRef, dataToSend).then(() => {
        dispatch(clearGenerateForm());
        getCodes();
      });
  }
  function removeCode(id: string) {
    let dataToDelete = doc(db, 'tests-id', id);
    deleteDoc(dataToDelete)
      .then(() => {
        console.log('Deleted');
        getCodes();
      })
      .catch((err) => {
        console.log(err.message);
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
      {auth.currentUser !== null && (
        <h4 className={styles.dashboard__header}>
          Welcome {auth.currentUser.email}!
        </h4>
      )}
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
      {isOpen && (
        <div className={styles.modal}>
          <h2>Success!</h2>
          <div className={styles.close} onClick={closeModalFn}></div>
        </div>
      )}
      {auth.currentUser && (
        <div className={styles.dashboard__container}>
          <h4 className={styles.dashboard__header}>Generate test</h4>
          <form onSubmit={generateTest} className={styles.form}>
            <select
              value={semester.value}
              onChange={(e) => dispatch(handleSemesterChangeFn(e.target.value))}
              className={styles.form__input}
            >
              <option value="egzamin-inz-sem1">Semestr 1</option>
              <option value="egzamin-inz-sem2">Semestr 2</option>
              <option value="egzamin-inz-sem3">Semestr 3</option>
              <option value="egzamin-inz-sem4">Semestr 4</option>
              <option value="egzamin-inz-sem5">Semestr 5</option>
              {/*<option value="egzamin-inz-sem6">Semestr 6</option>*/}
            </select>
            <input
              type="text"
              name="candidatesEmail"
              value={candidatesEmail}
              onChange={(e) => dispatch(handleEmailChangeFn(e.target.value))}
              className={styles.form__input}
              placeholder="Candidates email"
              required
            />
            <button type="submit" className={styles.dashboard__button}>
              Generate
            </button>
          </form>
        </div>
      )}
      {auth.currentUser && (
        <>
          <h4 className={styles.dashboard__header}>Your test's</h4>
          <div className={styles.table__container}>
            <table>
              <tbody>
                <tr>
                  <th>
                    <strong>
                      <FaUserAlt />
                    </strong>
                    <span>Candidate's email</span>
                  </th>
                  <th>
                    <strong>
                      <FaFile />{' '}
                    </strong>
                    <span>Topic</span>
                  </th>
                  <th>
                    <strong>
                      <FaAward />{' '}
                    </strong>
                    <span>Score</span>
                  </th>
                  <th>
                    <strong>
                      <FaBarcode />{' '}
                    </strong>
                    <span>Test ID</span>
                  </th>
                </tr>
                {authData.codes.map((code: any, id: number) => (
                  <tr key={id}>
                    <td>{code.candidatesEmail}</td>
                    <td>{code.topic}</td>
                    <td>{code.score < 0 ? 'unfinished' : code.score}</td>
                    <td>{code.id}</td>
                    <td>
                      <button
                        onClick={() => removeCode(code.id)}
                        className={styles.remove__code}
                      >
                        <span>
                          <FaTimes />
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={getCodes} className={styles.dashboard__button}>
            Refresh{' '}
            <span className={styles.arrows}>
              <FaSyncAlt />
            </span>
          </button>
        </>
      )}
      {auth.currentUser && (
        <div className={styles.dashboard__container}>
          <h4 className={styles.dashboard__header}>Add question</h4>
          <form onSubmit={addQuestion} className={styles.form}>
            <select
              value={semester.value}
              onChange={(e) => dispatch(handleSemesterChangeFn(e.target.value))}
              className={styles.form__input}
            >
              <option value="egzamin-inz-sem1">Semestr 1</option>
              <option value="egzamin-inz-sem2">Semestr 2</option>
              <option value="egzamin-inz-sem3">Semestr 3</option>
              <option value="egzamin-inz-sem4">Semestr 4</option>
              <option value="egzamin-inz-sem5">Semestr 5</option>
              {/*<option value="egzamin-inz-sem6">Semestr 6</option>*/}
              <option value="frontend-junior">Junior Frontend</option>
              <option value="frontend-regular">Regular Frontend</option>
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
