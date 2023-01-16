import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const Navbar = (props: any) => {
  const { user } = useSelector((store: any) => store.auth);
  const navRef = useRef<HTMLUListElement>(null);
  const toggleNavbar = () => {
    // index.css style
    navRef.current!.classList.toggle('responsive__nav');
  };

  return (
    <nav>
      <button
        className={`${styles.open__button} ${styles.navbar__button}`}
        onClick={toggleNavbar}
      >
        <FaBars />
      </button>
      <ul ref={navRef}>
        <NavLink to="/" className={styles.link} onClick={toggleNavbar}>
          Home
        </NavLink>
        {/*<NavLink to="/questions" className={styles.link} onClick={toggleNavbar}>*/}
        {/*  Questions*/}
        {/*</NavLink>*/}
        <NavLink to="/dashboard" className={styles.link} onClick={toggleNavbar}>
          {user ? 'Dashboard' : 'Sign in'}
        </NavLink>
        <button
          className={`${styles.close__button} ${styles.navbar__button}`}
          onClick={toggleNavbar}
        >
          <FaTimes />
        </button>
      </ul>
      <div className={styles.switch__container}>
        <button
          className={`${styles.theme__button} ${styles.navbar__button}`}
          onClick={props.changeTheme()}
        >
          <span>{props.theme === 'light' ? 'Light Theme' : 'Dark Theme'}</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
