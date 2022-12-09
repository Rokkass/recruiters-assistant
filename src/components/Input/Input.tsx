import styles from './Input.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputChangeFn } from '../../features/dashboardSlice';
import { handleAuthInputChange } from '../../features/authSlice';

interface InputProps {
  type: string;
  name: string;
  // value: string;
  placeholder: string;
  required?: boolean;
}

const Input = ({ type, name, placeholder, required }: InputProps) => {
  const newValue = useSelector((store: any) => store.dashboard[name]);
  const authValue = useSelector((store: any) => store.auth[name]);
  const dispatch = useDispatch();

  return (
    <div className={styles.form__group + ' ' + styles.field}>
      {(name === 'email' || name === 'password') && (
        <label className={styles.input__label}>{name}:</label>
      )}
      {type === 'email' || type === 'password' ? (
        <input
          type={type}
          name={name}
          value={authValue}
          onChange={(e) =>
            dispatch(handleAuthInputChange({ name, value: e.target.value }))
          }
          className={styles.form__field}
          placeholder={placeholder}
          required
        />
      ) : required ? (
        <input
          type={type}
          name={name}
          value={newValue}
          onChange={(e) =>
            dispatch(handleInputChangeFn({ name, value: e.target.value }))
          }
          className={styles.form__field}
          placeholder={placeholder}
          required
        />
      ) : (
        <input
          type={type}
          name={name}
          value={newValue}
          onChange={(e) =>
            dispatch(handleInputChangeFn({ name, value: e.target.value }))
          }
          className={styles.form__field}
          placeholder={placeholder}
        />
      )}
      {/*<label htmlFor="name" className={styles.form__label}>*/}
      {/*  {name === 'content' ? 'Question' : name}*/}
      {/*</label>*/}
    </div>
  );
};

export default Input;
