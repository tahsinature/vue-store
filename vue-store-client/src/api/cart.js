const axios = require('axios');

const url = '/cart';

const getCart = () => axios.default.get(url);
const saveCart = data => axios.default.post(url, data);

module.exports = {
  getCart,
  saveCart,
};
