import { client, tokenHeader } from './client';

const URL = 'account';

export const myInfo = ({ id }) => {
  const token = localStorage.getItem('token');
  return client.get(`/${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const myInfoEdit = ({ parameter }) => {
  const token = localStorage.getItem('token');
  return client.put(`/${URL}`, parameter, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const accountDelete = ({ userId }) => {
  const token = localStorage.getItem('token');
  return client.delete(`/${URL}/${userId}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const findId = ({ email }) => {
  return client.get(`/account/email/${email}`).catch(error => {
    throw error.response.data;
  });
};

export const findQuestion = ({ userId }) => {
  const token = localStorage.getItem('token');
  console.log(userId);
  return client.get(`/account/my/question`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const findPassword = ({ answer, email, id, questionId }) => {
  const token = localStorage.getItem('token');
  const parameter = { answer, email, id, questionId };
  return client
    .get(`/account/my/question`, parameter, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};
