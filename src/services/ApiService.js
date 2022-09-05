import axios from 'axios';
import { $api, API_URL } from '../http';

const ApiService = {
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

  async logout(uid) {
    return axios.post(
      API_URL + '/auth/logout',
      { uid },
      { withCredentials: true }
    );
  },

  async checkAuth() {
    return $api.get('/auth/verify');
  },

  async searchUsers(query) {
    return $api.get(API_URL + `/users/searchUsers?q=${query}`);
  },

  async getOtherUserData(uid) {
    return $api.get(API_URL + '/users/oneUser', {
      headers: { data: uid },
    });
  },

  async friendsRequest(uid) {
    return $api.post(API_URL + '/friends/request', { receiverUid: uid });
  },

  async getFriendsData() {
    return $api.get(API_URL + '/friends/friendsData');
  },
};

export default ApiService;
