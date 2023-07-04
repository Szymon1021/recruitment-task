import axios from 'axios';

const options = {
  method: 'POST',
  headers: {
    accept: 'application/json',
  },
};
const fetchGetAll = async () => {
  const response = axios.get(
    'https://capap.gugik.gov.pl/api/fts/hier/_cfg',
    options
  );
  console.log(response);
  return (await response).data.result;
};

export const api = {
  fetchGetAll,
};
