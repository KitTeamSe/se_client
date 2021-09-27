import { client } from './client';

export const signin = ({ id, pw }) => {
  const data = { id, pw };
  return client.post('signin', data).catch(error => {
    throw error.response.data;
  });
};

export const checkPassword = ({ pw }) => {
  const data = { id: localStorage.getItem('userId'), pw };
  return client.post('signin', data).catch(error => {
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
  const data = {
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
  return client.post('signup', data).catch(error => {
    throw error.response.data;
  });
};
