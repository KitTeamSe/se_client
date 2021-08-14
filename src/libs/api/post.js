import { client, tokenHeader } from './client';

export const loadAccountList = async ({ boardId, direction, page, size }) => {
  const parameters = { boardId, direction, page, size };
  return client.get('/post', { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const loadMenuList = async ({ token }) => {
  return client.get('/menu', tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};
