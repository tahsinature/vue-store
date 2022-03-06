const axios = require('axios');

const url = '/products';

const getSingleProduct = id => axios.get(`${url}/${id}`);
const getAllProducts = (page, query) => {
  let URL = !page ? url : `${url}/?page=${page}`;
  function generateURL() {
    if (query && query.category) URL += `&category=${query.category}`;
    if (query && query.location) URL += `&location=${query.location}`;
  }
  generateURL();
  return axios.get(URL);
};
const newProduct = productDetails => axios.post(url, productDetails);
const editProduct = (id, productDetails) => axios.put(`${url}/${id}`, productDetails);
const markAsSold = id => axios.patch(`${url}/${id}`);
const deleteProduct = id => axios.delete(`${url}/${id}`);

module.exports = {
  newProduct,
  getAllProducts,
  editProduct,
  getSingleProduct,
  deleteProduct,
  markAsSold,
};
