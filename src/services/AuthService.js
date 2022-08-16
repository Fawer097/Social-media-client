import axios from 'axios';
import { $api, API_URL } from '../http';

class AuthService {
  async checkAuth() {
    return $api.get('/auth/verify');
  }

  async logout(email) {
    return axios.post(
      API_URL + '/auth/logout',
      { email },
      { withCredentials: true }
    );
  }
}

export default new AuthService();
