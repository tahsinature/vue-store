const axios = require('axios');

const url = '/reviews';

const makeReview = data => axios.post(url, data);
const likeReview = id => axios.post(`${url}/${id}`);
const removeReview = id => axios.delete(`${url}/${id}`);

module.exports = {
  makeReview,
  removeReview,
  likeReview,
};
