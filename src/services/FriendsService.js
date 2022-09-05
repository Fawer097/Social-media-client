import ApiService from './ApiService';

const FriendsService = {
  async friendsRequest(uid) {
    return await ApiService.friendsRequest(uid).catch((error) =>
      console.log(error)
    );
  },
};

export default FriendsService;
