import { client } from './client';

export const loadAccountList = async ({ boardId, direction, page, size }) => {
  const parameters = { boardId, direction, page, size };
  return client.get('/post', { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const signin = ({ id, pw }) => {
  const data = {
    id: { id }.id,
    pw: { pw }.pw
  };
  return client.post('signin', data).catch(error => {
    throw error.response.data.message;
  });
};
