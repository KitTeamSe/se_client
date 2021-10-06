import { client, tokenHeader } from './client';

const URL = 'menu';

export const loadMenuList = async () => {
  const token = localStorage.getItem('token');
  return client.get(`/${URL}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export default null;
