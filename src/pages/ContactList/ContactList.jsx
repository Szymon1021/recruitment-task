import { useParams } from 'react-router-dom';
import styles from './ContactList.module.css';
import { nanoid } from 'nanoid';
import React from 'react';

export const ContactList = () => {
  const { user, deleteFunction } = useParams();
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
    <div>
      <ul className={styles.list}> {valuesList}</ul>
    </div>
  );
};