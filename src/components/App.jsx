import React from 'react';
import './styles.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Nav from './Nav';

export const App = () => {
  return (
    <div>
      <Nav />
      <hr />
      <div>
        <ContactForm />
      </div>
    </div>
  );
};
