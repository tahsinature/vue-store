const axios = require('axios');

const url = '/notifications';

const getNotifications = () => axios.default.get(url);
const markAsRead = data => axios.default.put(url, data);
const deleteNotifications = data => axios.default.delete(url, { data });

module.exports = {
  getNotifications,
  markAsRead,
  deleteNotifications,
};
