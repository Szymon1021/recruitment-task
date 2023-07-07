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
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/msc?cnt=50&o=0&dt=false',
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
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/ulc?cnt=50&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi', v: `${valueGmina}` },
      { level: 'msc', v: `${valueCity}` },
      { level: 'ulc' },
    ]
  );
  console.log(response.data);
  return response.data;
};
const fetchPostCode = async (
  valueWoj,
  valuePow,
  valueGmina,
  valueCity,
  valueUl
) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/kod?cnt=50&o=0&dt=false',
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
};
const fetchNr = async (valueWoj, valuePow, valueGmina, valueCity, valueUl) => {
  const response = await axios.post(
    'https://capap.gugik.gov.pl/api/fts/hier/fdict/pkt/nr?cnt=50&o=0&dt=false',
    [
      { level: 'woj', v: `${valueWoj}` },
      { level: 'pow', v: `${valuePow}` },
      { level: 'gmi', v: `${valueGmina}` },
      { level: 'msc', v: `${valueCity}` },
      { level: 'ulc', v: `${valueUl}` },
      { level: 'nr' },
    ]
  );
  console.log(response.data);
  return response.data;
};
const fetchAdress = async (valueNr, valueKod, valueCity, street) => {
  console.log(street);
  const response = await axios.post(
    'https://capap.gugik.gov.pl//api/fts/gc/pkt',
    {
      reqs: [
        {
          pkt_numer: `${valueNr}`,
          pkt_kodPocztowy: `${valueKod}`,
          ul_pelna: `${street}`,
          miejsc_nazwa: `${valueCity}`,
        },
      ],
      useExtServiceIfNotFound: true,
    }
  );
  console.log(response.data[0].others.geometry.coordinates);
  return response.data[0].others.geometry.coordinates;
};

export const api = {
  fetchWoj,
  fetchPow,
  fetchGmina,
  fetchCity,
  fetchUl,
  fetchPostCode,
  fetchNr,
  fetchAdress,
};
