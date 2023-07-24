import React from 'react';
import { useState, useEffect } from 'react';
import { api } from 'components/api/Api';
import { nanoid } from 'nanoid';

import './ContactForm.css';
import { StaticMap } from 'pages/map/StaticMap';
import Form from 'pages/Form/Form';
import { ContactList } from 'pages/ContactList/ContactList';

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
  const [map, setMap] = useState(false);
  const [userMap, setUserMap] = useState([]);
  const [cl, setCl] = useState(false);

  console.log(map);

  const getWoj = async () => {
    try {
      const voivodeshipList = await api.fetchWoj();
      setWoj(voivodeshipList);
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
      if (valueWoj && valuePow && valueGmina && valueCity && valueUl && valueKod && valueNr !== '') {
        api
          .fetchCoordinate(
            valueWoj,
            valuePow,
            valueGmina,
            valueCity,
            valueUl,
            valueKod,
            valueNr
          )
          .then(data => {
            setLatLng(data.reverse());
          });
      } else if (valueUl && valueKod && valueNr === '') {
         api
           .fetchCoordinate(valueWoj, valuePow, valueGmina, valueCity)
           .then(data => {
             setLatLng(data.reverse());
           });
      }
    } catch (error) {}
  }, [valueWoj, valuePow, valueGmina, valueCity, valueUl, valueKod, valueNr]);

  useEffect(() => {
    try {
      window.addEventListener('keydown', handleKeyPress);
    } catch (error) {}
  }, []);
  /* handleSelect */

  const handleSelect = woj => {
    setValueWoj(woj);
  };
  console.log(valueWoj);
  const handleSelectPow = pow => {
    setValuePow(pow);
  };
  const handleSelectGmina = gmina => {
    setValueGmina(gmina);
  };
  const handleSelectCity = city => {
    setValueCity(city);
  };
  const handleSelectUl = ul => {
    setValueUl(ul);
  };
  const handleSelectKod = kod => {
    setValueKod(kod);
  };
  const handleSelectNr = nr => {
    setValueNr(nr);
  };
  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
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

    form.reset();
    console.log(user);
  };

  const handleMapButton = () => {
    setMap(true);
  };
  const handleClButton = user => {
    setCl(true);
    setUserMap(user);
  };

  const handleMapButtonClose = () => {
    setMap(false);
  };
  const handleClButtonClose = () => {
    setCl(false);
  };

  const handleKeyPress = event => {
    if (event.key === 'Escape') {
      setMap(false);
      setCl(false);
    }
  };

  const deleteFunction = id => {
    const newFilteredContacts = user.filter(contact => contact.id !== id);
    setUser(newFilteredContacts);
  };

  return (
    <div className="container-contactform">
      <div className="main">
        <div className="open-modal">
          <button
            style={{ height: 50 }}
            title="open Map"
            onClick={() => handleMapButton({ userMap })}
          >
            <span class="button-content">Map </span>
          </button>
          <button
            style={{ height: 50 }}
            title="open Cl"
            onClick={() => handleClButton({ userMap })}
          >
            <span class="button-content">List</span>
          </button>
        </div>
        <Form
          handleSubmit={handleSubmit}
          handleChangeEmail={handleChangeEmail}
          handleChangeName={handleChangeName}
          handleChangeLastName={handleChangeLastName}
          handleSelect={handleSelect}
          handleSelectCity={handleSelectCity}
          woj={woj}
          pow={pow}
          city={city}
          gmina={gmina}
          ul={ul}
          kod={kod}
          nr={nr}
          handleSelectGmina={handleSelectGmina}
          handleSelectKod={handleSelectKod}
          handleSelectNr={handleSelectNr}
          handleSelectUl={handleSelectUl}
          handleSelectPow={handleSelectPow}
          handleMapButton={handleMapButton}
          userMap={userMap}
          handleClButton={handleClButton}
        />
      </div>
      {map && (
        <StaticMap
          userMap={user}
          handleKeyPress={handleKeyPress}
          handleMapButtonClose={handleMapButtonClose}
        />
      )}
      {cl && (
        <ContactList
          user={user}
          handleKeyPress={handleKeyPress}
          handleClButtonClose={handleClButtonClose}
          deleteFunction={deleteFunction}
        />
      )}
    </div>
  );
}
