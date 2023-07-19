import React from 'react';
import { useState, useEffect } from 'react';
import { api } from './api/Api';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import './styles.css';
import 'leaflet/dist/leaflet.css';

export const App = () => {
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
  const [showSuggestions, setShowSugestions] = useState(false);
  const [showSuggestionsPow, setShowSugestionsPow] = useState(false);
  const [showSuggestionsGmina, setShowSugestionsGmina] = useState(false);
  const [showSuggestionsCity, setShowSugestionsCity] = useState(false);
  const [showSuggestionsUl, setShowSugestionsUl] = useState(false);
  const [showSuggestionsKod, setShowSugestionsKod] = useState(false);
  const [showSuggestionsNr, setShowSugestionsNr] = useState(false);

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
  const deleteFunction = id => {
    const newFilteredContacts = user.filter(contact => contact.id !== id);
    setUser(newFilteredContacts);
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

  const customIcon = new Icon({
    iconUrl: require('./map/icon.png'),
    iconSize: [20, 20],
  });
  const handleSuggestionWoj = woj => {
    setValueWoj(woj.value);
    setShowSugestions(false);
  };

  const handleSuggestionPow = pow => {
    setValuePow(pow.value);
    setShowSugestionsPow(false);
  };

  const handleSuggestionGmina = gmina => {
    setValuePow(gmina.value);
    setShowSugestionsGmina(false);
  };
  const handleSuggestionCity = city => {
    setValueCity(city.value);
    setShowSugestionsCity(false);
  };
  const handleSuggestionUl = ul => {
    setValueUl(ul.value);
    setShowSugestionsUl(false);
  };
  const handleSuggestionKod = kod => {
    setValueKod(kod.value);
    setShowSugestionsKod(false);
  };
  const handleSuggestionNr = nr => {
    setValueNr(nr.value);
    setShowSugestionsNr(false);
  };

  return (
    <div>
      <section
        style={{
          display: 'flex',
          margin: 10,
        }}
      >
        <div className="box">
          <form
            onSubmit={handleSubmit}
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
            <input
              value={valueWoj}
              onChange={handleSelect}
              placeholder="Wojewodztwo"
              onFocus={() => setShowSugestions(true)}
            />
            {showSuggestions && (
              <ul>
                {woj.length > 0 &&
                  woj
                    .filter(woj => woj.value.toLowerCase().includes(valueWoj))
                    .map(woj => {
                      return (
                        <li
                          onClick={() => handleSuggestionWoj(woj)}
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
                onFocus={() => setShowSugestionsPow(true)}
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
                          onClick={() => handleSuggestionPow(pow)}
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
                onFocus={() => setShowSugestionsGmina(true)}
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
                        onClick={() => handleSuggestionGmina(gmina)}
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
                onFocus={() => setShowSugestionsCity(true)}
              />
            )}
            {showSuggestionsCity && (
              <ul>
                {city
                  .filter(city => city.value.toLowerCase().includes(valueCity))
                  .map(city => {
                    return (
                      <li
                        onClick={() => handleSuggestionCity(city)}
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
                onFocus={() => setShowSugestionsUl(true)}
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
                          onClick={() => handleSuggestionUl(ul)}
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
                onFocus={() => setShowSugestionsKod(true)}
              />
            )}
            {showSuggestionsKod && (
              <ul>
                {kod.length > 0 &&
                  kod
                    .filter(kod => kod.value.toLowerCase().includes(valueKod))
                    .map(valueKod => {
                      return (
                        <li
                          onClick={() => handleSuggestionKod(kod)}
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
                placeholder="City"
                onFocus={() => setShowSugestionsNr(true)}
              />
            )}
            {showSuggestionsCity && (
              <ul>
                {nr.length > 0 &&
                  nr
                    .filter(nr => nr.value.toLowerCase().includes(valueNr))
                    .map(nr => {
                      return (
                        <li
                          onClick={() => handleSuggestionNr(nr)}
                          key={nanoid()}
                        >
                          {nr.value}
                        </li>
                      );
                    })}
              </ul>
            )}
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div>
          <ContactList user={user} deleteFunction={deleteFunction} />
        </div>
      </section>
      <div>
        <MapContainer
          center={[52.230496539240356, 20.57358750525853]}
          zoom={5}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {user === null
            ? null
            : user.map(({ latlng, name, lastname, city, id }) => {
                return (
                  <Marker key={id} position={latlng} icon={customIcon}>
                    <Popup>
                      {name} - {lastname} <br /> {city}
                    </Popup>
                  </Marker>
                );
              })}
        </MapContainer>
      </div>
    </div>
  );
};
