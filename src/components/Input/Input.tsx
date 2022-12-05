import styles from './Input.module.scss';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleInputChangeFn } from '../../features/formSlice';

interface InputProps {
  type: string;
  name: string;
  // value: string;
  placeholder: string;
  required?: boolean;
}

const Input = ({ type, name, placeholder, required }: InputProps) => {
  const dispatch = useDispatch();
  const newValue = useSelector((store: any) => store.form[name]);

  return (
    <div className={styles.form__group + ' ' + styles.field}>
      {required ? (
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
