import { client, tokenHeader } from './client';

export const reportPost = async ({ description, reportType, targetId }) => {
  const body = { description, reportType, targetId };
  const token = localStorage.getItem('token');
  return client
    .post(`/administrator/report`, body, tokenHeader(token))
    .catch(error => {
      throw error.response.data;
    });
};

// lint 설정 상 한 개 함수만 export 불가능
export default null;
