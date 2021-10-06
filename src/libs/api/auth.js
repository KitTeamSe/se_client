import { client } from './client';

export const signin = ({ id, pw }) => {
  const body = { id, pw };
  return client.post('signin', body).catch(error => {
    throw error.response.data;
  });
};

export const checkPassword = ({ pw }) => {
  const body = { id: localStorage.getItem('userId'), pw };
  return client.post('signin', body).catch(error => {
    throw error.response.data;
  });
};

export const signup = ({
  answer,
  email,
  id,
  name,
  nickname,
  password,
  phoneNumber,
  questionId,
  studentId,
  type
}) => {
  const body = {
    answer,
    email,
    id,
    name,
    nickname,
    password,
    phoneNumber,
    questionId,
    studentId,
    type
  };
  return client.post('signup', body).catch(error => {
    throw error.response.data;
  });
};
