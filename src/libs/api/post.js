import { client, tokenHeader } from './client';

export const loadPostList = async ({ boardNameEng, direction, page, size }) => {
  const parameters = { boardNameEng, direction, page, size };
  return client.get('/post', { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const searchPost = async ({ postSearchRequest }) => {
  return client.post('/post/search', postSearchRequest).catch(error => {
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
  return client.post('/post', data, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const loadPost = async ({ id }) => {
  return client.get(`/post/${id}`).catch(error => {
    throw error.response.data;
  });
};

export const loadSecretPost = async ({ postId, password }) => {
  const parameters = { postId, password };
  return client.get(`/post/secret`, { params: parameters }).catch(error => {
    throw error.response.data;
  });
};

export const postDelete = async ({ id }) => {
  const token = localStorage.getItem('token');
  return client.delete(`/post/${id}`, tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

export const anonymousPostDelete = async ({ anonymousPassword, postId }) => {
  const body = { anonymousPassword, postId };
  console.log(postId);
  return client.post(`/post/anonymous/${postId}`, body).catch(error => {
    throw error.response.data;
  });
};
