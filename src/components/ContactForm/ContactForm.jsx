import React from 'react';
import { useState, useEffect } from 'react';
import { api } from 'components/api/Api';
import { nanoid } from 'nanoid';
import { ContactList } from 'components/ContactList/ContactList';
import { StaticMap } from 'components/map/StaticMap';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

import './ContactForm.css';
import { Box } from '@mui/material';

export default function ContactForm() {
  const [woj, setWoj] = useState([]);
  const [pow, setPow] = useState([]);
  const [gmina, setGmina] = useState([]);
  const [city, setCity] = useState([]);
  const [ul, setUl] = useState([]);
  const [kod, setKod] = useState([]);
  const [nr, setNr] = useState([]);
  const [name, setName] = useState([]);
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
  const [latlng, setLatLng] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showSuggestionsPow, setShowSuggestionsPow] = useState(false);
  const [showSuggestionsGmina, setShowSuggestionsGmina] = useState(false);
  const [showSuggestionsCity, setShowSuggestionsCity] = useState(false);
  const [showSuggestionsUl, setShowSuggestionsUl] = useState(false);
  const [showSuggestionsKod, setShowSuggestionsKod] = useState(false);
  const [showSuggestionsNr, setShowSuggestionsNr] = useState(false);

  const getWoj = async () => {
    try {
      const voivodeshipList = await api.fetchWoj();
      setWoj(voivodeshipList);
      console.log(woj.value);
    } catch (error) {}
  };
  console.log(woj.filter(woj => woj.value.toLowerCase().includes(valueWoj)));

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

  /* useEffects */

  useEffect(() => {
    try {
      const json = localStorage.getItem('user');
      const user = JSON.parse(json);

      if (user) {
        setUser(user);
      }
    } catch (error) {}
  }, []);

  useEffect(() => {
    const json = JSON.stringify(user);
    localStorage.setItem('user', json);
  }, [user]);

  useEffect(() => {
    try {
      getWoj();
    } catch (error) {}
  }, []);

  useEffect(() => {
    try {
      if (valueWoj !== '') {
        api.fetchPow(valueWoj).then(data => setPow(data));
      }
    } catch (error) {}
  }, [valueWoj]);

  useEffect(() => {
    try {
      if (valueWoj && valuePow !== '') {
        api.fetchGmina(valueWoj, valuePow).then(data => setGmina(data));
      }
    } catch (error) {}
  }, [valueWoj, valuePow]);

  useEffect(() => {
    try {
      if (valueWoj && valuePow && valueGmina !== '') {
        api
          .fetchCity(valueWoj, valuePow, valueGmina)
          .then(data => setCity(data));
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina]);

  useEffect(() => {
    try {
      if (valueWoj && valuePow && valueGmina && valueCity !== '') {
        api.fetchUl(valueWoj, valuePow, valueGmina, valueCity).then(data => {
          console.log(data[0].value);
          if (data[0].value !== '') {
            setUl(data);
          } else {
            console.log('Brak danych ulic');
            setUl('');
            alert(`This ${valueCity} has not street in the data `);
          }
        });
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina, valueCity]);

  useEffect(() => {
    try {
      if (valueWoj && valuePow && valueGmina && valueCity && valueUl !== '') {
        api
          .fetchPostCode(valueWoj, valuePow, valueGmina, valueCity, valueUl)
          .then(data => setKod(data));
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl]);

  useEffect(() => {
    try {
      if (
        valueWoj &&
        valuePow &&
        valueGmina &&
        valueCity &&
        valueUl &&
        valueKod !== ''
      ) {
        api
          .fetchNr(valueWoj, valuePow, valueGmina, valueCity, valueUl, valueKod)
          .then(data => setNr(data));
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl, valueKod]);

  useEffect(() => {
    try {
      if (valueWoj && valuePow && valueGmina && valueCity !== '') {
        api
          .fetchCoordinate(valueWoj, valuePow, valueGmina, valueCity)
          .then(data => {
            setLatLng(data.reverse());
          });
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl, valueKod, valueNr]);
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
  };
  const handleSelectKod = evt => {
    evt.preventDefault();
    setValueKod(evt.target.value);
  };
  const handleSelectNr = evt => {
    evt.preventDefault();
    setValueNr(evt.target.value);
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
      latlng: latlng,
    };

    setUser([...user, newUser]);

    console.log(user);
  };

  const handleSuggestionsWoj = woj => {
    setValueWoj(woj.value);
    setShowSuggestions(false);
  };

  const handleSuggestionsPow = pow => {
    setValuePow(pow.value);
    setShowSuggestionsPow(false);
  };

  const handleSuggestionsGmina = gmina => {
    setValueGmina(gmina.value);
    setShowSuggestionsGmina(false);
  };
  const handleSuggestionsCity = city => {
    setValueCity(city.value);
    console.log(valueCity);
    setShowSuggestionsCity(false);
  };
  const handleSuggestionsUl = ul => {
    setValueUl(ul.value);
    setShowSuggestionsUl(false);
  };
  const handleSuggestionsKod = kod => {
    setValueKod(kod.value);
    setShowSuggestionsKod(false);
  };
  const handleSuggestionsNr = nr => {
    setValueNr(nr.value);
    setShowSuggestionsNr(false);
  };

  const deleteFunction = id => {
    const newFilteredContacts = user.filter(contact => contact.id !== id);
    setUser(newFilteredContacts);
  };

  return (
    <div>
      <div className="main">
        <div className="box">
          <form
            onSubmit={handleSubmit}
            autocomplete="off"
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginTop: 10,
              width: 160,
              gap: 10,
            }}
          >
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

            <label>LastName: </label>
            <input
              type="text"
              name="LastName"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              placeholder="LastName"
              onChange={handleChangeLastName}
              value={lastname}
            />
            <label>email: </label>
            <input
              type="email"
              name="email"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="email"
              onChange={handleChangeEmail}
              value={email}
            />
            <label>Adres: </label>
            <input
              value={valueWoj}
              onChange={handleSelect}
              placeholder="Wojewodztwo"
              onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
              <ul>
                {woj.length > 0 &&
                  woj
                    .filter(woj => woj.value.toLowerCase().includes(valueWoj))
                    .map(woj => {
                      return (
                        <li
                          onClick={() => handleSuggestionsWoj(woj)}
                          key={nanoid()}
                        >
                          {woj.value}
                        </li>
                      );
                    })}
              </ul>
            )}
            {pow.length > 0 && (
              <input
                value={valuePow}
                onChange={handleSelectPow}
                placeholder="Powiat"
                onFocus={() => setShowSuggestionsPow(true)}
              />
            )}
            {showSuggestionsPow && (
              <ul>
                {pow.length > 0 &&
                  pow
                    .filter(pow => pow.value.toLowerCase().includes(valuePow))
                    .map(pow => {
                      return (
                        <li
                          onClick={() => handleSuggestionsPow(pow)}
                          key={nanoid()}
                        >
                          {pow.value}
                        </li>
                      );
                    })}
              </ul>
            )}

            {gmina.length > 0 && (
              <input
                value={valueGmina}
                onChange={handleSelectGmina}
                placeholder="Gmina"
                onFocus={() => setShowSuggestionsGmina(true)}
              />
            )}
            {showSuggestionsGmina && (
              <ul>
                {gmina
                  .filter(gmina =>
                    gmina.value.toLowerCase().includes(valueGmina)
                  )
                  .map(gmina => {
                    return (
                      <li
                        onClick={() => handleSuggestionsGmina(gmina)}
                        key={nanoid()}
                      >
                        {gmina.value}
                      </li>
                    );
                  })}
              </ul>
            )}
            {city.length > 0 && (
              <input
                value={valueCity}
                onChange={handleSelectCity}
                placeholder="City"
                onFocus={() => setShowSuggestionsCity(true)}
              />
            )}
            {showSuggestionsCity && (
              <ul>
                {city
                  .filter(city => city.value.toLowerCase().includes(valueCity))
                  .map(city => {
                    return (
                      <li
                        onClick={() => handleSuggestionsCity(city)}
                        key={nanoid()}
                      >
                        {city.value}
                      </li>
                    );
                  })}
              </ul>
            )}
            {ul.length > 0 && (
              <input
                value={valueUl}
                onChange={handleSelectUl}
                placeholder="Ul"
                onFocus={() => setShowSuggestionsUl(true)}
              />
            )}
            {showSuggestionsUl && (
              <ul>
                {ul.length > 0 &&
                  ul
                    .filter(ul => ul.value.toLowerCase().includes(valueUl))
                    .map(ul => {
                      return (
                        <li
                          onClick={() => handleSuggestionsUl(ul)}
                          key={nanoid()}
                        >
                          {ul.value}
                        </li>
                      );
                    })}
              </ul>
            )}
            {kod.length > 0 && (
              <input
                value={valueKod}
                onChange={handleSelectKod}
                placeholder="Kod"
                onFocus={() => setShowSuggestionsKod(true)}
              />
            )}
            {showSuggestionsKod && (
              <ul>
                {kod.length > 0 &&
                  kod
                    .filter(kod => kod.value.toLowerCase().includes(valueKod))
                    .map(kod => {
                      return (
                        <li
                          onClick={() => handleSuggestionsKod(kod)}
                          key={nanoid()}
                        >
                          {kod.value}
                        </li>
                      );
                    })}
              </ul>
            )}
            {nr.length > 0 && (
              <input
                value={valueNr}
                onChange={handleSelectNr}
                placeholder="Nr"
                onFocus={() => setShowSuggestionsNr(true)}
              />
            )}
            {showSuggestionsNr && (
              <ul>
                {nr.length > 0 &&
                  nr
                    .filter(nr => nr.value.toLowerCase().includes(valueNr))
                    .map(nr => {
                      return (
                        <li
                          onClick={() => handleSuggestionsNr(nr)}
                          key={nanoid()}
                        >
                          {nr.value}
                        </li>
                      );
                    })}
              </ul>
            )}
            <Autocomplete
              id="woj"
              getOptionLabel={woj => woj.value}
              options={woj}
              renderOption={
                (woj,
                props => {
                  <Box component="li" {...props} key={nanoid()}>
                    {woj.value}
                  </Box>;
                })
              }
              renderInput={params => (
                <TextField {...params} label="Wojewodztwo" />
              )}
            />
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
