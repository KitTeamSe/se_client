import { client, tokenHeader } from './client';

const URL = 'account';

export const myInfo = ({ id }) => {
  const token = localStorage.getItem('token');
  return client.get(`/${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const myInfoEdit = ({ parameter }) => {
  const token = localStorage.getItem('token');
  return client.put(`/${URL}`, parameter, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const accountDelete = ({ userId }) => {
  const token = localStorage.getItem('token');
  return client.delete(`/${URL}/${userId}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};
