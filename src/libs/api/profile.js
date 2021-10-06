import { client, tokenHeader } from './client';

export const userSearch = async ({ id }) => {
  const token = localStorage.getItem('token');

  return client.get(`/account/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const myinfo = ({ token }) => {
  return client.get('account/my', tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};
