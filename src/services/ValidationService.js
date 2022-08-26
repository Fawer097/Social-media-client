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

  nameValidation(clearErrors) {
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

  inputValidation() {
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
