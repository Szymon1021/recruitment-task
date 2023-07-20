import React, { Suspense } from 'react';
import './styles.css';
import ContactForm from 'components/ContactForm/ContactForm';
import Nav from './Nav';
import { Route, Routes } from 'react-router-dom';
import { StaticMap } from './map/StaticMap';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  return (
    <div>
      <Nav />
      <hr />
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          <Route path="/" element={<ContactForm />}></Route>
          <Route path="/Map" element={<StaticMap />}></Route>

          <Route path="/ContactList" element={<ContactList />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
};
