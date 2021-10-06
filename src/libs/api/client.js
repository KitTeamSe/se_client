import axios from 'axios';

export const client = axios.create();

client.defaults.baseURL = process.env.REACT_APP_API_URL;
client.defaults.crossDomain = true;
client.defaults.headers.Accept = '*/*';
client.defaults.headers.withCredentials = true;
client.defaults.headers['Access-Control-Allow-Origin'] = '*';
client.defaults.headers['Access-Control-Allow-Methods'] =
  'GET,PUT,POST,DELETE,PATCH,OPTIONS';
client.defaults.headers['Access-Control-Allow-Headers'] =
  'Content-Type, Authorization, Content-Length, X-Requested-With';

client.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.data.code === 'GE05') {
      localStorage.clear();
      window.location.reload(true);
    }
    return Promise.reject(error);
  }
);
export const tokenHeader = token => ({ headers: { 'X-AUTH-TOKEN': token } });
