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
    return $api.get(API_URL + '/users/otherUser', {
      headers: { data: uid },
    });
  },

  async friendsRequest(receiverUid) {
    return $api.post(API_URL + '/friends/friendRequest', { receiverUid });
  },

  async sendMessage(receiverUid, message) {
    return $api.post(API_URL + '/messager/message', {
      receiverUid,
      ...message,
    });
  },

  async getAllFriendsData() {
    return $api.get(API_URL + '/friends/allData');
  },

  async getFriendsData() {
    return $api.get(API_URL + '/friends/friendsData');
  },

  async getCandidatesData() {
    return $api.get(API_URL + '/friends/candidatesData');
  },

  async getChatsData() {
    return $api.get(API_URL + '/messager/chatsData');
  },
};

export default ApiService;
