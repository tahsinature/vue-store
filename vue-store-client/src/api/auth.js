const axios = require('axios');

const url = '/auth';

const checkAvailablity = (data) => {
  let URL = url;
  function generateURL() {
    if (data && data.userName) URL += `?userName=${data.userName}`;
    if (data && data.email) URL += `?email=${data.email}`;
  }
  generateURL();
  return axios.get(URL);
};
const editUser = data => axios.put(`${url}`, data);
const registerUser = data => axios.post(`${url}/register`, data);
const authenticateUser = token => axios.post(`${url}/authenticate`, token);
const loginUser = credentials => axios.post(`${url}/login`, credentials);
const getUser = id => axios.get(`${url}/${id}`);

module.exports = {
  registerUser,
  authenticateUser,
  loginUser,
  getUser,
  checkAvailablity,
  editUser,
};
