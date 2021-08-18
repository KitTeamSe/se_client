import qs from 'qs';
import { client, tokenHeader } from './client';

const URL = `reply`;

export const addReply = ({
  anonymous,
  isSecret,
  parentId,
  postId,
  text,
  files
}) => {
  const formData = new FormData();
  const token = localStorage.getItem('token');
  const data = { anonymous, isSecret, parentId, postId, text };

  formData.append(
    'key',
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  );

  files.forEach(({ file }) => {
    formData.append('files', file);
  });

  return client.post(`${URL}`, formData, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });
};

export const updateReply = ({
  password,
  isSecret,
  parentId,
  postId,
  text,
  files
}) => {
  const formData = new FormData();
  const data = { password, isSecret, parentId, postId, text };

  formData.append(
    'key',
    new Blob([JSON.stringify(data)], { type: 'application/json' })
  );

  files.forEach(({ file }) => {
    formData.append('files', file);
  });

  return client.put(`${URL}`, formData).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
    }
    throw error.response.data;
  });
};

export const removeReply = ({ id }) =>
  client.delete(`${URL}/${id}`).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });

export const getReplyById = ({ replyId }) =>
  client.get(`${URL}/${replyId}`).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });

export const getReplyList = ({ direction, page, size }) => {
  const queryString = qs.stringify({ direction, page, size });

  return client.get(`${URL}?${queryString}`).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error;
  });
};

export const removeReplyAnony = ({ password, replyId }) => {
  const anonymousReplyDeleteRequest = { password, replyId };
  return client
    .delete(`${URL}/anonymous`, anonymousReplyDeleteRequest)
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};

export const getReplyReplyList = ({ postId }) =>
  client.get(`${URL}/post/${postId}`).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error;
  });
