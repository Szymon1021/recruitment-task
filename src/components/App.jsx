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
  const [latlng, setLatLng] = useState([]);

  const getWoj = async () => {
    try {
      const voivodeshipList = await api.fetchWoj();

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

  return (
    <div>
      <section
        style={{
          display: 'flex',
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
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              placeholder="LastName"
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
              <option value="">Wojewodztwo</option>
              {woj.map(woj => (
                <option value={woj.value}>{woj.value}</option>
              ))}
            </select>
            {pow.length > 0 && (
              <select name="Powiat" value={valuePow} onChange={handleSelectPow}>
                <option value="">Powiat</option>
                {pow.map(pow => (
                  <option value={pow.value}>{pow.value}</option>
                ))}
              </select>
            )}
            {gmina.length > 0 && (
              <select
                name="Gmina"
                value={valueGmina}
                onChange={handleSelectGmina}
              >
                <option value="">Gmina</option>
                {gmina.map(gmina => (
                  <option value={gmina.value}>{gmina.value}</option>
                ))}
              </select>
            )}
            {city.length > 0 && (
              <select name="City" value={valueCity} onChange={handleSelectCity}>
                <option value="">Miasto</option>
                {city.map(city => (
                  <option value={city.value}>{city.value}</option>
                ))}
              </select>
            )}
            {ul.length > 0 && (
              <select name="Ul" value={valueUl} onChange={handleSelectUl}>
                <option value="">ulica</option>
                {ul.map(ul => (
                  <option value={ul.value}>{ul.value}</option>
                ))}
              </select>
            )}
            {kod.length > 0 && (
              <select name="Kod" value={valueKod} onChange={handleSelectKod}>
                <option value="">kod pocztowy</option>
                {kod.map(kod => (
                  <option value={kod.value}>{kod.value}</option>
                ))}
              </select>
            )}
            {nr.length > 0 && (
              <select name="nr" value={valueNr} onChange={handleSelectNr}>
                <option value="">nr mieszkania</option>
                {nr.map(nr => (
                  <option value={nr.value}>{nr.value}</option>
                ))}
              </select>
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
                      {name}: {lastname} <br /> {city}
                    </Popup>
                  </Marker>
                );
              })}
        </MapContainer>
      </div>
    </div>
  );
};
