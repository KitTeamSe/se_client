import { client, tokenHeader } from './client';

export const myinfo = ({ token }) => {
  return client.get('account/my', tokenHeader(token)).catch(error => {
    throw error.response.data;
  });
};

// lint 설정 상 한 개 함수만 export 불가능
export default null;
