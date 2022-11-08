import styles from './Navbar.module.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <ul>
        <NavLink to="/" className={styles.link}>
          Home
        </NavLink>
        <NavLink to="/questions" className={styles.link}>
          Questions
        </NavLink>
        <NavLink to="/form" className={styles.link}>
          Add questions
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
