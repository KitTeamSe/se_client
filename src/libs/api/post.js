import { client } from './client';

export const loadPostList = async ({ boardId, direction, page, size }) => {
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

export const makeSomePost = async ({ formData }) => {
  return client.post('/post', formData).catch(error => {
    throw error.response.data;
  });
};
