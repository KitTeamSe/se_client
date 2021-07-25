import client from './client';

export const signin = ({ id, pw }) => {
  const data = {
    id: { id }.id,
    pw: { pw }.pw
  };
  return client.post('signin/manager', data).catch(error => {
    throw error;
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
}) =>
  client.post('signup', {
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
  });
