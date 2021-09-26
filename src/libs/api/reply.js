import qs from 'qs';
import { client, tokenHeader } from './client';

const URL = `reply`;

export const addReply = ({
  anonymous,
  isSecret,
  parentId,
  postId,
  text,
  attachmentList
}) => {
  const token = localStorage.getItem('token');
  const data = { anonymous, isSecret, parentId, postId, text, attachmentList };

  return client.post(`${URL}`, data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const updateReply = ({
  password,
  isSecret,
  replyId,
  text,
  attachmentList
}) => {
  const token = localStorage.getItem('token');
  const data = {
    password,
    isSecret,
    replyId,
    text,
    attachmentList
  };

  return client.put(`${URL}`, data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const removeReply = ({ id }) => {
  const token = localStorage.getItem('token');

  return client.delete(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const getReplyById = ({ replyId }) => {
  const token = localStorage.getItem('token');

  return client.get(`${URL}/${replyId}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const getReplyList = ({ postId, direction, page, size }) => {
  const queryString = qs.stringify({ direction, page, size });
  const token = localStorage.getItem('token');

  return client
    .get(`${URL}/post/${postId}?${queryString}`, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const removeReplyAnony = ({ password, replyId }) => {
  const anonymousReplyDeleteRequest = { password, replyId };
  const token = localStorage.getItem('token');

  return client
    .post(`${URL}/anonymous`, anonymousReplyDeleteRequest, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const getSecretReply = ({ password, replyId }) => {
  const queryString = qs.stringify({ password, replyId });
  const token = localStorage.getItem('token');

  return client
    .get(`${URL}/secret?${queryString}`, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};
