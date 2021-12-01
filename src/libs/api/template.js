import qs from 'qs';
import { client, tokenHeader } from './client';

const URL = `reply`;

export const getTemp = ({ id, search1, search2 }) => {
  const queryString = qs.stringify({ search1, search2 });
  const token = localStorage.getItem('token');

  return client
    .get(`${URL}/${id}?${queryString}`, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const addTemp = ({ state1, state2, state3 }) => {
  const token = localStorage.getItem('token');
  const data = { state1, state2, state3 };

  return client.post(`${URL}`, data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const updateTemp = ({ state1, state2, state3 }) => {
  const token = localStorage.getItem('token');
  const data = { state1, state2, state3 };

  return client.put(`${URL}`, data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const removeTemp = ({ id }) => {
  const token = localStorage.getItem('token');

  return client.delete(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};
