import { client } from './client';

export const loadMenuList = async () => {
  return client.get('/menu').catch(error => {
    throw error.response.data;
  });
};

export default null;
