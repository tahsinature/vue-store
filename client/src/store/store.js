import Vue from 'vue';
import Vuex from 'vuex';
import products from './products';
import cart from './cart';
import admin from './admin';
import notification from './notification';
import chat from './chat';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: localStorage.getItem('token'),
    isLoggedIn: false,
  },
  getters: {
    token(state) {
      return state.token;
    },
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
  },
  mutations: {
    makeIsLoggedInTrue(state) {
      state.isLoggedIn = true;
    },
  },
  actions: {
    makeIsLoggedInTrue({ commit }) {
      commit('makeIsLoggedInTrue');
    },
  },
  modules: {
    products,
    cart,
    admin,
    chat,
    notification,
  },
});
