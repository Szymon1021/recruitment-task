import './styles.css';
import ContactForm from 'pages/ContactForm/ContactForm';

import { Route, Routes } from 'react-router-dom';
import { StaticMap } from '../pages/map/StaticMap';
import { ContactList } from '../pages/ContactList/ContactList';
import Nav from './Nav';

export const App = () => {
  return (
    <div>
      <Nav />

      <hr />
      <Routes>
        <Route path="/" element={<ContactForm />}></Route>
        <Route path="/Map/:user" element={<StaticMap />}></Route>
        <Route path="/ContactList/:user" element={<ContactList />}></Route>
      </Routes>
    </div>
  );
};
