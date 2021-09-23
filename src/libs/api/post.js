import { client, tokenHeader } from './client';

const URL = 'post';

export const loadPostList = async ({ boardNameEng, direction, page, size }) => {
  const parameters = { boardNameEng, direction, page, size };
  return client.get(`/${URL}`, { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const searchPost = async ({ postSearchRequest }) => {
  return client.post(`/${URL}/search`, postSearchRequest).catch(error => {
    throw error.response.data;
  });
};

export const loadMenuList = async () => {
  return client.get('/menu').catch(error => {
    throw error.response.data;
  });
};

export const makeSomePost = async ({ data }) => {
  const token = localStorage.getItem('token');
  return client.post(`/${URL}`, data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const loadPost = async ({ id }) => {
  return client.get(`/${URL}/${id}`).catch(error => {
    throw error.response.data;
  });
};

export const loadSecretPost = async ({ postId, password }) => {
  const parameters = { postId, password };
  return client.get(`/${URL}/secret`, { params: parameters }).catch(error => {
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
  return client.post(`/${URL}/anonymous/${postId}`, body).catch(error => {
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
  return client.post(`/administrator/report`, body, tokenHeader(token));
};
