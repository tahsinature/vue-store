const bcrypt = require("bcryptjs");

const utility = {
  async genHashForPass(pass) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(pass, salt);
    return hashed;
  },

  async compare(pass, hash) {
    const result = await bcrypt.compare(pass, hash);
    return result;
  },
};

module.exports = utility;
