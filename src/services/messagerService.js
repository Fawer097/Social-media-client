import { $api, API_URL } from '../http';

const messagerService = {
  async sendMessage(receiverUid, message) {
    return $api.post(API_URL + '/messager/message', {
      receiverUid,
      ...message,
    });
  },

  async getChatsData() {
    return $api.get(API_URL + '/messager/chatsData');
  },
};

export default messagerService;
