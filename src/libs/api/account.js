import { client, tokenHeader } from './client';

export const myinfo = ({ id }) => {
  const token = localStorage.getItem('token');
  return client.get(`/account/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const myinfoedit = ({ parameter, token }) => {
  return client.put('/account', parameter, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const accountdelete = ({ userId, token }) => {
  console.log('잘가요');
  return client
    .delete(`/account/${userId}`, tokenHeader(token))
    .catch(error => {
      throw error.response.data.message;
    });
};
