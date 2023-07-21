import React from 'react';
import { AutoComplete } from 'antd';
import './Form.css';
export default function Form({
  handleSubmit,
  handleChangeName,
  name,
  handleChangeLastName,
  lastname,
  handleChangeEmail,
  email,
  woj,
  handleSelect,
  pow,
  handleSelectPow,
  gmina,
  handleSelectGmina,
  city,
  handleSelectCity,
  ul,
  handleSelectUl,
  kod,
  handleSelectKod,
  nr,
  handleSelectNr,
  handleMapButton,
  userMap,
  handleClButton,
}) {
  return (
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
        <AutoComplete
          popupClassName="menu"
          options={woj}
          filterOption={true}
          onChange={handleSelect}
          autoFocus={true}
          placeholder="Wojewodztwo"
        />
        {pow.length > 0 && (
          <AutoComplete
            style={{ width: '100%' }}
            options={pow}
            filterOption={true}
            onChange={handleSelectPow}
            autoFocus={true}
            placeholder="Powiat"
          />
        )}

        {gmina.length > 0 && (
          <AutoComplete
            options={gmina}
            filterOption={true}
            onChange={handleSelectGmina}
            autoFocus={true}
            placeholder="Gmina"
          />
        )}

        {city.length > 0 && (
          <AutoComplete
            options={city}
            filterOption={true}
            onChange={handleSelectCity}
            autoFocus={true}
            placeholder="Miasto"
          />
        )}

        {ul.length > 0 && (
          <AutoComplete
            options={ul}
            filterOption={true}
            onChange={handleSelectUl}
            autoFocus={true}
            placeholder="ulica"
          />
        )}

        {kod.length > 0 && (
          <AutoComplete
            options={kod}
            filterOption={true}
            onChange={handleSelectKod}
            autoFocus={true}
            placeholder="kod"
          />
        )}

        {nr.length > 0 && (
          <AutoComplete
            placeholder="nr"
            options={nr}
            filterOption={true}
            onChange={handleSelectNr}
            autoFocus={true}
          />
        )}

        <div>
          <button type="submit">
            <span class="button-content">Register </span>
          </button>
        </div>
      </form>
    </div>
  );
}
