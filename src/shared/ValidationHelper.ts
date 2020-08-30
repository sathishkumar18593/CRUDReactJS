module.exports = {
  isValidEmail(email) {
    if (!email) return false;
    var regEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regEx.test(email);
  },
};
