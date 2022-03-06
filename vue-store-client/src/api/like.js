const axios = require('axios');

const url = '/likes';

const toggleLike = data => axios.post(url, data);

module.exports = {
  toggleLike,
};
