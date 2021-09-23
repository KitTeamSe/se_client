import { client, tokenHeader } from './client';

const URL = 'account';
export const myinfo = ({ id }) => {
  const token = localStorage.getItem('token');
  return client.get(`/${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const myinfoedit = ({ parameter, token }) => {
  return client.put(`/${URL}`, parameter, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const accountdelete = ({ userId, token }) => {
  console.log('잘가요');
  return client.delete(`/${URL}/${userId}`, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};
