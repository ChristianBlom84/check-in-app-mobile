export const emailConstraints = {
  emailAddress: {
    presence: {
      allowEmpty: false,
      message: '^Please enter an email address'
    },
    email: {
      message: '^Please enter a valid email address'
    }
  }
};
