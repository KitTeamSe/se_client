import { client } from './client';

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
