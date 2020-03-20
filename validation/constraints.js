export const formConstraints = {
  email: {
    email: {
      message: '^Please enter a valid email address'
    }
  },
  name: {
    presence: {
      allowEmpty: false,
      message: '^Please enter your name'
    }
  }
};
