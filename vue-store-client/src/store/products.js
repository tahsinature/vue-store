const state = {
  products: [],
  selectedProduct: null,
};

const getters = {
  products(state) {
    return state.products;
  },
  getSelectedProduct(state) {
    return state.selectedProduct;
  },
};

const mutations = {
  storeFetchedData(state, payload) {
    state.products = payload;
  },
  addNewProduct(state, payload) {
    state.products.unshift(payload);
  },
  removeProduct(state, payload) {
    const item = state.products.find(product => product._id === payload);
    state.products.splice(state.products.indexOf(item), 1);
  },
  editProduct(state, payload) {
    // state.products.find(element => )
    console.log(payload);
  },
  setSelectedProduct(state, payload) {
    state.selectedProduct = payload;
  },
  removeSelectedProduct(state) {
    state.selectedProduct = null;
  },
  likeProduct(state, payload) {
    state.selectedProduct.likers.push(payload);
    state.selectedProduct.likes += 1;
  },
  dislikeProduct(state, payload) {
    state.selectedProduct.likers.pop(payload);
    state.selectedProduct.likes -= 1;
  },
};

const actions = {
  storeFetchedData({ commit }, payload) {
    commit('storeFetchedData', payload);
  },
  addNewProduct({ commit }, payload) {
    commit('addNewProduct', payload);
  },
  removeProduct({ commit }, payload) {
    commit('removeProduct', payload);
  },
  editProduct({ commit }, payload) {
    commit('editProduct', payload);
  },
  setSelectedProduct({ commit }, payload) {
    commit('setSelectedProduct', payload);
  },
  removeSelectedProduct({ commit }) {
    commit('removeSelectedProduct');
  },
  likeProduct({ commit }, payload) {
    commit('likeProduct', payload);
  },
  dislikeProduct({ commit }, payload) {
    commit('dislikeProduct', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
