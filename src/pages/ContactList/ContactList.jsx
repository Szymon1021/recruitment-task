import styles from './ContactList.module.css';
import { nanoid } from 'nanoid';
import React from 'react';

export const ContactList = ({ user, deleteFunction, handleClButtonClose }) => {
  const valuesList = user.map(input => {
    return (
      <li className={styles.contactlist} key={nanoid()}>
        {input.name} {input.lastname}, {input.email}, {input.city}
        <button type="button" onClick={() => deleteFunction(input.id)}>
          delete
        </button>
      </li>
    );
  });
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Lista kontaktow:</p>
        <button className={styles.close} onClick={handleClButtonClose}>
          CLOSE
        </button>
        <ul className={styles.list}> {valuesList}</ul>
      </div>
    </div>
  );
};
