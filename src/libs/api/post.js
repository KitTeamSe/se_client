import { client } from './client';

export const loadAccountList = async ({ boardId, direction, page, size }) => {
  const parameters = { boardId, direction, page, size };
  return client.get('/post', { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const loadMenuList = async () => {
  return client.get('/menu').catch(error => {
    throw error.response.data;
  });
};
