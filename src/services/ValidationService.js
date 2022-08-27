const ValidationService = {
  upperFirstLetter(event) {
    if (event.target.value) {
      const arr = event.target.value.split('');
      arr[0] = arr[0].toUpperCase();
      event.target.value = arr.join('');
    }
  },

  minDate() {
    return `${new Date().getFullYear() - 120}-0${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  },

  maxDate() {
    return `${new Date().getFullYear()}-0${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;
  },

  nameValidation() {
    return {
      required: 'This field must be filled',
      minLength: {
        value: 2,
        message: 'Minimum of 2 characters',
      },
      maxLength: {
        value: 28,
        message: 'No more than 28 characters',
      },
      pattern: {
        value: /^[-A-Za-z ]*$/,
        message: 'Invalid characters',
      },
      onChange: this.upperFirstLetter,
    };
  },

  emailValidation() {
    return {
      required: 'This field must be filled',
      pattern: {
        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/,
        message: 'Invalid characters',
      },
    };
  },

  passwordValidation() {
    return {
      required: 'This field must be filled',
      minLength: {
        value: 6,
        message: 'Minimum 6 characters',
      },
      maxLength: {
        value: 128,
        message: 'No more than 128 characters',
      },
      pattern: {
        value: /^\S*$/,
        message: 'Password must be without spaces',
      },
    };
  },

  passwordsMatchValidation(value) {
    return {
      required: 'This field must be filled',
      validate: () => {
        if (value('createPassword') !== value('confirmPassword')) {
          return 'Password do not match';
        }
      },
    };
  },

  latinValidation() {
    return {
      pattern: {
        value: /^[-A-Za-z ]*$/,
        message: 'Invalid characters',
      },
      onChange: this.upperFirstLetter,
    };
  },
};

export default ValidationService;
