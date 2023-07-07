import React from 'react';
import { useState, useEffect } from 'react';
import { api } from './api/Api';
import { nanoid } from 'nanoid';

export const App = () => {
  const [woj, setWoj] = useState([]);
  const [pow, setPow] = useState('');
  const [gmina, setGmina] = useState('');
  const [city, setCity] = useState('');
  const [ul, setUl] = useState('');
  const [kod, setKod] = useState('');
  const [nr, setNr] = useState('');
  const [name, setName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState([]);
  const [valueWoj, setValueWoj] = useState('');
  const [valuePow, setValuePow] = useState('');
  const [valueGmina, setValueGmina] = useState('');
  const [valueCity, setValueCity] = useState('');
  const [valueUl, setValueUl] = useState('');
  const [valueKod, setValueKod] = useState('');
  const [valueNr, setValueNr] = useState('');
  const [street, setStreet] = useState('');
  const getWoj = async () => {
    try {
      const voivodeshipList = await api.fetchWoj();
      console.log(voivodeshipList);
      setWoj(voivodeshipList);
    } catch (error) {}
  };

  const handleChangeName = e => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleChangeLastName = e => {
    e.preventDefault();
    setLastName(e.target.value);
  };

  const handleChangeEmail = e => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newUser = {
      id: nanoid(),
      name: name,
      lastname: lastname,
      email: email,
      woj: valueWoj,
      pow: valuePow,
      gmina: valueGmina,
      city: valueCity,
      ul: valueUl,
      kod: valueKod,
      nr: valueNr,
    };
    setUser([...user, newUser]);
  };

  /* useEffects */
  useEffect(() => {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
  }, [user]);

  useEffect(() => {
    getWoj();
  }, []);

  useEffect(() => {
    if (valueWoj !== '') {
      api.fetchPow(valueWoj).then(data => setPow(data));
    }
  }, [valueWoj]);

  useEffect(() => {
    if (valueWoj && valuePow !== '') {
      api.fetchGmina(valueWoj, valuePow).then(data => setGmina(data));
    }
  }, [valueWoj, valuePow]);

  useEffect(() => {
    if (valueWoj && valuePow && valueGmina !== '') {
      api.fetchCity(valueWoj, valuePow, valueGmina).then(data => setCity(data));
    }
  }, [valueWoj, valuePow, valueGmina]);

  useEffect(() => {
    if (valueWoj && valuePow && valueGmina && valueCity !== '') {
      api.fetchUl(valueWoj, valuePow, valueGmina, valueCity).then(data => {
        setUl(data);
      });
    }
  }, [valueWoj, valuePow, valueGmina, valueCity]);

  useEffect(() => {
    if (valueWoj && valuePow && valueGmina && valueCity && valueUl !== '') {
      api
        .fetchPostCode(valueWoj, valuePow, valueGmina, valueCity, valueUl)
        .then(data => setKod(data));
      setStreet(valueUl.split('').slice(1).join(' ').toLocaleLowerCase());
    }
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl]);

  useEffect(() => {
    if (valueWoj && valuePow && valueGmina && valueCity && valueUl !== '') {
      api
        .fetchNr(valueWoj, valuePow, valueGmina, valueCity, valueUl)
        .then(data => setNr(data));
    }
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl]);

  /* handleSelect */

  const handleSelect = evt => {
    evt.preventDefault();
    setValueWoj(evt.target.value);
  };
  const handleSelectPow = evt => {
    evt.preventDefault();
    setValuePow(evt.target.value);
  };
  const handleSelectGmina = evt => {
    evt.preventDefault();
    setValueGmina(evt.target.value);
  };
  const handleSelectCity = evt => {
    evt.preventDefault();
    setValueCity(evt.target.value);
  };
  const handleSelectUl = evt => {
    evt.preventDefault();
    setValueUl(evt.target.value);
    setStreet(evt.target.value);
  };
  const handleSelectKod = evt => {
    evt.preventDefault();
    setValueKod(evt.target.value.toString());
  };
  const handleSelectNr = evt => {
    evt.preventDefault();
    setValueNr(evt.target.value.toString());
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label> Name: </label>
        <input
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          placeholder="Name"
          onChange={handleChangeName}
          value={name}
        />

        <label> Nazwisko: </label>
        <input
          type="text"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="Nazwisko"
          onChange={handleChangeLastName}
          value={lastname}
        />
        <label>email: </label>
        <input
          type="email"
          name="email"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          placeholder="email"
          onChange={handleChangeEmail}
          value={email}
        />
        <select name="Wojewodztwo" value={valueWoj} onChange={handleSelect}>
          <option value="">--Please choose an option--</option>
          {woj.map(woj => (
            <option value={woj.value}>{woj.value}</option>
          ))}
        </select>
        {pow.length > 0 && (
          <select name="Powiat" value={valuePow} onChange={handleSelectPow}>
            <option value="">--Please choose an option--</option>
            {pow.map(pow => (
              <option value={pow.value}>{pow.value}</option>
            ))}
          </select>
        )}
        {gmina.length > 0 && (
          <select name="Gmina" value={valueGmina} onChange={handleSelectGmina}>
            <option value="">--Please choose an option--</option>
            {gmina.map(gmina => (
              <option value={gmina.value}>{gmina.value}</option>
            ))}
          </select>
        )}
        {city.length > 0 && (
          <select name="City" value={valueCity} onChange={handleSelectCity}>
            <option value="">--Please choose an option--</option>
            {city.map(city => (
              <option value={city.value}>{city.value}</option>
            ))}
          </select>
        )}
        {ul.length > 0 && (
          <select name="Ul" value={valueUl} onChange={handleSelectUl}>
            <option value="">--Please choose an option--</option>
            {ul.map(ul => (
              <option value={ul.value}>{ul.value}</option>
            ))}
          </select>
        )}
        {kod.length > 0 && (
          <select name="Kod" value={valueKod} onChange={handleSelectKod}>
            <option value="">--Please choose an option--</option>
            {kod.map(kod => (
              <option value={kod.value}>{kod.value}</option>
            ))}
          </select>
        )}
        {nr.length > 0 && (
          <select name="nr" value={valueNr} onChange={handleSelectNr}>
            <option value="">--Please choose an option--</option>
            {nr.map(nr => (
              <option value={nr.value}>{nr.value}</option>
            ))}
          </select>
        )}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
      <div></div>
    </div>
  );
};
