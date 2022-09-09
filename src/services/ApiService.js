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

  async friendRequest(receiverUid) {
    return $api.post(API_URL + '/friends/friendRequest', { receiverUid });
  },

  async removeOutgoingRequest(receiverUid) {
    return $api.post(API_URL + '/friends/removeOutgoingRequest', {
      receiverUid,
    });
  },

  async removeIncomingRequest(receiverUid) {
    return $api.post(API_URL + '/friends/removeIncomingRequest', {
      receiverUid,
    });
  },

  async removeFriend(receiverUid) {
    return $api.post(API_URL + '/friends/removeFriend', { receiverUid });
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

  async getOutgoingCandidatesData() {
    return $api.get(API_URL + '/friends/outgoingCandidatesData');
  },

  async getChatsData() {
    return $api.get(API_URL + '/messager/chatsData');
  },

  async createPost(data) {
    return $api.post(API_URL + '/posts/createPost', data);
  },

  async getPosts() {
    return $api.get(API_URL + '/posts/userPosts');
  },

  async likePost(postId, ownerPost) {
    return $api.post(API_URL + '/posts/likePost', { postId, ownerPost });
  },

  async getOtherUserPosts(uid) {
    return $api.get(API_URL + '/posts/otherUserPosts', {
      headers: { data: uid },
    });
  },

  async getFeedPosts() {
    return $api.get(API_URL + '/posts/feedPosts');
  },
};

export default ApiService;
