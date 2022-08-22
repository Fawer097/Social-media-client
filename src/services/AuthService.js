import axios from 'axios';
import { $api, API_URL } from '../http';

const AuthService = {
  async signUp(data) {
    return axios.post(API_URL + '/auth/signUp', data, {
      withCredentials: true,
    });
  },

  async signIn(data) {
    return axios.post(API_URL + '/auth/signIn', data, {
      withCredentials: true,
    });
  },

  async logout(email) {
    return axios.post(
      API_URL + '/auth/logout',
      { email },
      { withCredentials: true }
    );
  },

  async checkAuth() {
    return $api.get('/auth/verify');
  },
};

export default AuthService;
