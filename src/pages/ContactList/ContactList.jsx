import './ContactList.css';
import { nanoid } from 'nanoid';
import React from 'react';

export const ContactList = ({ user, deleteFunction, handleClButtonClose }) => {
  const valuesList = user.map(input => {
    return (
      <li className="contactlist " key={nanoid()}>
        {input.name} {input.lastname}, {input.email}, {input.city}
        <button type="button" onClick={() => deleteFunction(input.id)}>
          delete
        </button>
      </li>
    );
  });
  return (
    <div className="overlay">
      <div className="modal">
        <p>Lista kontaktow:</p>
        <button className="close" onClick={handleClButtonClose}>
          CLOSE
        </button>
        <ul className="list"> {valuesList}</ul>
      </div>
    </div>
  );
};
