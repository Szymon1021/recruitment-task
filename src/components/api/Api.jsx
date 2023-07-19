import axios from 'axios';

const fetchWoj = async () => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/woj?cnt=50&o=0&dt=false',
    [{ level: 'woj' }]
  );
  console.log(response.data);
  return response.data;
};

const fetchPow = async valueWoj => {
  const response = await axios.post(
    ' https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/pow?cnt=50&o=0&dt=false',
    [{ level: 'woj', v: `${valueWoj}` }, { level: 'pow' }]
  );
  console.log(response.data);
  return response.data;
};
const fetchGmina = async (valueWoj, valuePow) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/gmi?cnt=50&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi' },
    ]
  );
  console.log(response.data);
  return response.data;
};
const fetchCity = async (valueWoj, valuePow, valueGmina) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/msc?cnt=500&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi', v: `${valueGmina}` },
      { level: 'msc' },
    ]
  );
  console.log(response.data);
  return response.data;
};
const fetchUl = async (valueWoj, valuePow, valueGmina, valueCity) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/ulc?cnt=5000&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi', v: `${valueGmina}` },
      { level: 'msc', v: `${valueCity}` },
      { level: 'ulc' },
    ]
  );
  console.log(response.data);
  if (response.data.value === '') {
    return `Nie ma w rejestrze takiej ulicy `;
  } else if (response.data.value !== '') {
    return response.data;
  }
};
const fetchPostCode = async (
  valueWoj,
  valuePow,
  valueGmina,
  valueCity,
  valueUl
) => {
  if (valueUl !== '') {
    const response = await axios.post(
      'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/kod?cnt=500&o=0&dt=false',
      [
        { level: 'woj', v: `${valueWoj}` },
        { level: 'pow', v: `${valuePow}` },
        { level: 'gmi', v: `${valueGmina}` },
        { level: 'msc', v: `${valueCity}` },
        { level: 'ulc', v: `${valueUl}` },
        { level: 'kod' },
      ]
    );
    console.log(response.data);
    return response.data;
  } else if (valueUl === '') {
    return `nie ma takiej ulicy `;
  }
};
const fetchNr = async (
  valueWoj,
  valuePow,
  valueGmina,
  valueCity,
  valueUl,
  valueKod
) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/nr?cnt=500&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi', v: `${valueGmina}` },
      { level: 'msc', v: `${valueCity}` },
      { level: 'ulc', v: `${valueUl}` },
      { level: 'kod', v: `${valueKod}` },
      { level: 'nr' },
    ]
  );
  console.log(response.data);
  return response.data;
};

const fetchCoordinate = async (valueWoj, valuePow, valueGmina, valueCity) => {
  if (valueWoj && valuePow && valueGmina && valueCity !== '') {
    const response = await axios.post(
      'https://capap.gugik.gov.pl/api/fts/hier/pkt/qq',
      [
        { level: 'woj', v: `${valueWoj}` },
        { level: 'pow', v: `${valuePow}` },
        { level: 'gmi', v: `${valueGmina}` },
        { level: 'msc', v: `${valueCity}` },
        { level: 'ulc', v: '' },
        { level: 'kod', v: '' },
        { level: 'nr', v: '' },
      ]
    );

    console.log(response.data.features[0].geometry.coordinates);
    return response.data.features[0].geometry.coordinates;
  }
};
console.log(fetchCoordinate());
export const api = {
  fetchWoj,
  fetchPow,
  fetchGmina,
  fetchCity,
  fetchUl,
  fetchPostCode,
  fetchNr,
  fetchCoordinate,
};
