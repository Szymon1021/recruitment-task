import React from 'react';

export default function ContactForm(
  woj,
  pow,
  gmina,
  city,
  ul,
  kod,
  nr,
  name,
  lastname,
  email,
  valueCity,
  valueGmina,
  valueKod,
  valueNr,
  valuePow,
  valueWoj,
  valueUl,
  handleChangeEmail,
  handleChangeLastName,
  handleChangeName,
  handleSelect,
  handleSelectCity,
  handleSelectGmina,
  handleSelectKod,
  handleSelectNr,
  handleSelectPow,
  handleSelectUl,
  handleSubmit
) {
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
    </div>
  );
}
