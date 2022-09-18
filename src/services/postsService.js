import { $api, API_URL } from '../http';

const postsService = {
  async createPost(data) {
    return $api.post(API_URL + '/posts/createPost', data);
  },

  async getPosts(uid) {
    return $api.get(API_URL + '/posts/userPosts', { headers: { data: uid } });
  },

  async deletePost(postId) {
    return $api.post(API_URL + '/posts/deletePost', { postId });
  },

  async updatePost(data) {
    return $api.post(API_URL + '/posts/updatePost', data);
  },

  async likePost(postId, ownerPost) {
    return $api.post(API_URL + '/posts/likePost', { postId, ownerPost });
  },

  async deleteLikePost(postId, ownerPost) {
    return $api.post(API_URL + '/posts/deleteLikePost', { postId, ownerPost });
  },

  async getFeedPosts() {
    return $api.get(API_URL + '/posts/feedPosts');
  },

  async createComment(data) {
    return $api.post(API_URL + '/posts/createComment', data);
  },

  async updateComment(data) {
    return $api.post(API_URL + '/posts/updateComment', data);
  },

  async deleteComment(data) {
    return $api.post(API_URL + '/posts/deleteComment', data);
  },

  async getComments(ownerUid, postId) {
    return $api.get(API_URL + '/posts/Comments', {
      headers: { ownerUid, postId },
    });
  },
};

export default postsService;
