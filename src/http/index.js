import axios from 'axios';

export const API_URL = 'http://localhost:3001/api';

export const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      axios
        .get(API_URL + '/auth/refresh', {
          withCredentials: true,
        })
        .then((response) => {
          localStorage.setItem('token', response.data.accessToken);
          return $api.request(originalRequest);
        })
        .catch((error) => console.log('You are not authorized!'));
    }
    throw error;
  }
);
