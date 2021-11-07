import { client, tokenHeader } from './client';

const URL = 'account';

export const findId = ({ email }) => {
  return client.get(`/account/email/${email}`).catch(error => {
    throw error.response.data;
  });
};

export const findQuestion = ({ userId }) => {
  const token = localStorage.getItem('token');
  return client
    .get(`/${URL}/my/question`, userId, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const findPassword = ({ answer, email, id, questionId }) => {
  const token = localStorage.getItem('token');
  const parameter = { answer, email, id, questionId };
  return client
    .get(`/${URL}/my/question`, parameter, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};
