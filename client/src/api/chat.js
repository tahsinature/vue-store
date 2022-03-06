const axios = require('axios');

const url = '/chats';

const getChats = () => axios.default.get(url);
const sendMessage = data => axios.default.post(url, data);

module.exports = {
  getChats,
  sendMessage,
};
