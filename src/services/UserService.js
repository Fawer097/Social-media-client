import { $api, API_URL } from '../http';

const userService = {
  async searchUsers(query) {
    return $api.get(API_URL + `/users/searchUsers?q=${query}`);
  },

  async getOtherUserData(uid) {
    return $api.get(API_URL + '/users/otherUser', {
      headers: { data: uid },
    });
  },

  async updateUserData(data) {
    return $api.post('/updateUserData', data);
  },

  async changeEmail(data) {
    return $api.post('/changeEmail', data);
  },

  async changePassword(data) {
    return $api.post('/changePassword', data);
  },

  dateConversion(date) {
    const mounthArr = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    if (!date) {
      return;
    }
    const dateArr = date.split('-');
    const dayNumberArr = dateArr[2].split('');
    if (dayNumberArr[0] === '0') {
      dateArr[2] = dayNumberArr[1];
    }
    return `${mounthArr[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
  },

  postTimestampConversion(seconds) {
    if (seconds) {
      const dateArr = new Date(seconds * 1000).toString().split(' ');
      const timeArr = dateArr[4].split(':');
      timeArr.length -= 1;
      return `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]} in ${timeArr.join(
        ':'
      )}`;
    }
  },

  messageTimestampConversion(seconds) {
    const date = new Date(seconds * 1000);
    const dateArr = date.toString().split(' ');

    let day = date.getDate();
    let mounth = date.getMonth() + 1;
    const year = date.getFullYear();
    const timeArr = dateArr[4].split(':');
    timeArr.length -= 1;

    if (day < 10) {
      day = `0${day}`;
    }
    if (mounth < 10) {
      mounth = `0${mounth}`;
    }

    return `${day}.${mounth}.${year}, ${timeArr.join(':')}`;
  },

  filterUsers(users, query) {
    const regexp = /\s+/g;
    const filterUsers = users.filter((user) =>
      user.fullName
        .toLowerCase()
        .replace(regexp, '')
        .includes(query.toLowerCase().replace(regexp, ''))
    );
    return filterUsers;
  },
};

export default userService;
