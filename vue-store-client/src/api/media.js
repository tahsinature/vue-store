const axios = require('axios');

const url = '/media';

const uploadMedia = fd => axios.post(url, fd);

module.exports = {
  uploadMedia,
};
