import { $api, API_URL } from '../http';

const galleryService = {
  async setImageLink(link) {
    return $api.post(API_URL + '/gallery/setImageLink', { link });
  },

  async getImageLinks(uid) {
    if (uid) {
      return $api.get(API_URL + '/gallery/getImageLinks', {
        headers: { data: uid },
      });
    }
    return $api.get(API_URL + '/gallery/getImageLinks');
  },
};

export default galleryService;
