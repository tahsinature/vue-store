import { cartController } from '../api';

const state = {
  cartProducts: [],
  cartStatus: '', // saved, loaded, change
};

const getters = {
  numOfItemInCart(state) {
    return state.cartProducts.length;
  },
  getCartItems(state) {
    return state.cartProducts;
  },
  totalCartPrice(state) {
    return state.cartProducts.reduce((pre, cur) => pre + cur.totalPrice(), 0);
  },
  cartStatus(state) {
    return state.cartStatus;
  },
};

const mutations = {
  addNew(state, payload) {
    let newItem = state.cartProducts.find(product => product._id === payload.target._id);
    if (newItem) {
      newItem.quantity += payload.quantity;
      return;
    }
    class NewItem {
      constructor(rawItem) {
        this._id = rawItem._id;
        this.title = rawItem.title;
        this.price = rawItem.price;
        this.quantity = payload.quantity;
      }

      totalPrice() {
        return this.quantity * this.price;
      }
    }
    newItem = new NewItem(payload.target);
    state.cartProducts.unshift(newItem);
  },
  removeItem(state, payload) {
    const item = state.cartProducts.find(product => product._id === payload);
    state.cartProducts.splice(state.cartProducts.indexOf(item), 1);
  },
  changeCartStatus(state, payload) {
    state.cartStatus = payload;
  },
};

const actions = {
  addToCart({ commit }, payload) {
    commit('addNew', payload);
    commit('changeCartStatus', 'change');
  },
  removeFromCart({ commit }, id) {
    commit('removeItem', id);
    commit('changeCartStatus', 'change');
  },
  changeCartStatus({ commit }, payload) {
    commit('changeCartStatus', payload);
  },
  saveCart({ commit }) {
    cartController.saveCart({ cartItems: state.cartProducts }).then(({ data }) => {
      commit('changeCartStatus', 'saved');
    });
  },
  loadCart({ commit }) {
    cartController.getCart().then(({ data }) => {
      data.forEach((x) => {
        commit('addNew', {
          quantity: x.quantity,
          target: x.product,
        });
      });
      commit('changeCartStatus', 'loaded');
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
