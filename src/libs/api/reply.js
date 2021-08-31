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

export const removeReply = ({ id }) => {
  const token = localStorage.getItem('token');

  return client.delete(`${URL}/${id}`, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });
};

export const getReplyById = ({ replyId }) =>
  client.get(`${URL}/${replyId}`).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });

export const getReplyList = ({ postId, direction, page, size }) => {
  const queryString = qs.stringify({ direction, page, size });
  const token = localStorage.getItem('token');

  return client
    .get(`${URL}/post/${postId}?${queryString}`, tokenHeader(token))
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};

export const removeReplyAnony = ({ password, replyId }) => {
  const anonymousReplyDeleteRequest = { password, replyId };
  const token = localStorage.getItem('token');

  return client
    .post(`${URL}/anonymous`, anonymousReplyDeleteRequest, tokenHeader(token))
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};

export const getReplySecret = ({ password, replyId }) => {
  const queryString = qs.stringify({ password, replyId });
  const token = localStorage.getItem('token');

  return client
    .post(`${URL}/secret?${queryString}`, tokenHeader(token))
    .catch(error => {
      if (error.response.data.code === 'GE05') {
        localStorage.clear();
        window.location.reload(true);
      }
      throw error.response.data;
    });
};
