import { getDownloadURL } from 'firebase/storage';

const UserService = {
  async showAvatar(ref, action, loading) {
    loading(true);
    getDownloadURL(ref)
      .then((url) => {
        action(url);
      })
      .catch((error) => {})
      .finally(() => loading(false));
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
    const dateArr = date.split('-');
    const dayNumberArr = dateArr[2].split('');
    if (dayNumberArr[0] === '0') {
      dateArr[2] = dayNumberArr[1];
    }
    return `${mounthArr[dateArr[1] - 1]} ${dateArr[2]}, ${dateArr[0]}`;
  },
};

export default UserService;
