import { client, tokenHeader } from './client';

const URL = 'post';

export const loadPostList = async ({
  boardNameEng,
  direction,
  isNotice,
  page,
  size
}) => {
  const parameters = { boardNameEng, direction, isNotice, page, size };
  const token = localStorage.getItem('token');
  return client
    .get(`/${URL}`, { params: parameters, ...tokenHeader(token) })
    .catch(error => {
      throw error.response.data;
    });
};

export const searchPost = async ({ postSearchRequest }) => {
  const token = localStorage.getItem('token');
  return client
    .post(`/${URL}/search`, postSearchRequest, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const loadPost = async ({ id }) => {
  const token = localStorage.getItem('token');
  return client.get(`/${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const loadSecretPost = async ({ postId, password }) => {
  const parameters = { postId, password };
  const token = localStorage.getItem('token');
  return client
    .get(`/${URL}/secret`, { params: parameters, ...tokenHeader(token) })
    .catch(error => {
      throw error.response.data;
    });
};

export const postDelete = async ({ id }) => {
  const token = localStorage.getItem('token');
  return client.delete(`/${URL}/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const anonymousPostDelete = async ({ anonymousPassword, postId }) => {
  const body = { anonymousPassword, postId };
  const token = localStorage.getItem('token');
  return client
    .post(`/${URL}/anonymous/${postId}`, body, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

export const addPost = ({
  anonymous,
  attachmentList,
  boardNameEng,
  isNotice,
  isSecret,
  postContent,
  tagList
}) => {
  const token = localStorage.getItem('token');
  const body = {
    anonymous,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
  };
  return client.post(`/post`, body, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const updatePost = ({
  postId,
  anonymousPassword,
  attachmentList,
  boardNameEng,
  isNotice,
  isSecret,
  postContent,
  tagList
}) => {
  const token = localStorage.getItem('token');
  const body = {
    postId,
    anonymousPassword,
    attachmentList,
    boardNameEng,
    isNotice,
    isSecret,
    postContent,
    tagList
  };
  return client.put(`/post`, body, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const reportPost = async ({ description, reportType, targetId }) => {
  const body = { description, reportType, targetId };
  const token = localStorage.getItem('token');
  return client
    .post(`/administrator/report`, body, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};
