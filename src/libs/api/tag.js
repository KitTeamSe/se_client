import { client, tokenHeader } from './client';

const URL = 'tag';

export const searchTag = ({ text }) => {
  const token = localStorage.getItem('token');

  return client.get(`${URL}/match/${text}`, tokenHeader(token)).catch(error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    throw error.response.data;
  });
};

// lint 설정 상 한 개 함수만 export 불가능
export default null;
