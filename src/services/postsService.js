import { $api, API_URL } from '../http';

const postsService = {
  async createPost(data) {
    return $api.post(API_URL + '/posts/createPost', data);
  },

  async getPosts() {
    return $api.get(API_URL + '/posts/userPosts');
  },

  async likePost(postId, ownerPost) {
    return $api.post(API_URL + '/posts/likePost', { postId, ownerPost });
  },

  async removeLikePost(postId, ownerPost) {
    return $api.post(API_URL + '/posts/removeLikePost', { postId, ownerPost });
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

export default postsService;
