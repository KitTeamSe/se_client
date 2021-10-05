import { client, tokenHeader } from './client';

export const loadMenuList = async () => {
  const token = localStorage.getItem('token');
  return client.get('/menu', tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export default null;
