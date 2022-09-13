import { $api, API_URL } from '../http';

const messagerService = {
  async sendMessage(receiverUid, data) {
    return $api.post(API_URL + '/messager/message', {
      receiverUid,
      data,
    });
  },

  async deleteChat(interlocutor) {
    return $api.post(API_URL + '/messager/deleteChat', { interlocutor });
  },

  async deleteMessage(receiverUid, messageId) {
    return $api.post(API_URL + '/messager/deleteMessage', {
      receiverUid,
      messageId,
    });
  },
};

export default messagerService;
