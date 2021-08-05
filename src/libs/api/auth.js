import { client, tokenHeader } from './client';

export const signin = ({ id, pw }) => {
  const data = {
    id: { id }.id,
    pw: { pw }.pw
  };
  return client.post('signin', data).catch(error => {
    throw error.response.data.message;
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
    answer: { answer }.answer,
    email: { email }.email,
    id: { id }.id,
    name: { name }.name,
    nickname: { nickname }.nickname,
    password: { password }.password,
    phoneNumber: { phoneNumber }.phoneNumber,
    questionId: { questionId }.questionId,
    studentId: { studentId }.studentId,
    type: { type }.type
  };
  return client.post('signup', data).catch(error => {
    throw error.response.data.message;
  });
};

export const myinfo = ({ token }) => {
  return client.get('account/my', tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const myinfoedit = ({ parameter, token }) => {
  return client.put('account', parameter, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};

export const accountdelete = ({ userId, token }) => {
  console.log('잘가요');
  return client.delete(`account/${userId}`, tokenHeader(token)).catch(error => {
    throw error.response.data.message;
  });
};
