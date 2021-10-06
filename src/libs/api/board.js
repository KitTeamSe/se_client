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
