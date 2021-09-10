import { client } from './client';

const URL = `attach`;

export const addAttachList = ({ files }) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  };
  const formData = new FormData();
  for (let i = 0; i < files.length; i += 1) {
    formData.append(`files`, files[i]);
  }

  return client.post(`${URL}`, formData, config).catch(error => {
    throw error.response.data;
  });
};

export const removeAttach = ({ id }) =>
  client.delete(`${URL}/${id}`).catch(error => {
    throw error.response.data;
  });
