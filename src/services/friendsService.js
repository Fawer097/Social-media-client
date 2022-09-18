import { $api, API_URL } from '../http';
import userService from './userService';

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

  async getFriendsUid(uid) {
    return $api.get(API_URL + '/friends/friendsUid', {
      headers: { data: uid },
    });
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

  friendsFilter(users, searchQuery, genderQuery) {
    let filterFriends = [];
    if (searchQuery && genderQuery) {
      const nameFilter = userService.filterUsers(users, searchQuery);
      filterFriends = nameFilter.filter(
        (user) => user.gender.toLowerCase() === genderQuery
      );
      return filterFriends;
    } else if (searchQuery && !genderQuery) {
      filterFriends = userService.filterUsers(users, searchQuery);
      return filterFriends;
    } else if (!searchQuery && genderQuery) {
      filterFriends = users.filter(
        (user) => user.gender.toLowerCase() === genderQuery
      );
      return filterFriends;
    }

    return users;
  },
};

export default friendsService;
