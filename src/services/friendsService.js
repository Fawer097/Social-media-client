import { $api, API_URL } from '../http';

const friendsService = {
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
};

export default friendsService;
