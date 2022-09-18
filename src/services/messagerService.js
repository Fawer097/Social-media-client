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

  filterMessages(messages, query) {
    const regexp = /\s+/g;
    const filterUsers = messages.filter((message) =>
      message.message
        .toLowerCase()
        .replace(regexp, '')
        .includes(query.toLowerCase().replace(regexp, ''))
    );
    return filterUsers;
  },
};

export default messagerService;
