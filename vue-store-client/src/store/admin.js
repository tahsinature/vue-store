const state = {
  admin: null,
  selectedUser: null,
};
const getters = {
  getAdmin(state) {
    return state.admin;
  },
  getSelectedUser(state) {
    return state.selectedUser;
  },
};

const mutations = {
  setAdmin(state, payload) {
    state.admin = payload;
  },
  removeAdmin(state) {
    state.admin = null;
  },
  setSelectedUser(state, payload) {
    state.selectedUser = payload;
  },
  setStatusOnline(state, payload) {
    if (state.selectedUser) {
      if (state.selectedUser.contacts) {
        const contact = state.selectedUser.contacts.find(ele => ele._id == payload);
        if (contact) contact.isOnline = true;
      }
    }
  },
  setStatusOffline(state, payload) {
    if (state.selectedUser) {
      if (state.selectedUser.contacts) {
        const contact = state.selectedUser.contacts.find(ele => ele._id == payload);
        if (contact) contact.isOnline = false;
      }
    }
  },
  addFriend(state, payload) {
    state.admin.contacts.unshift(payload);
  },
  removeFriend(state, payload) {
    state.admin.contacts.splice(state.admin.contacts.indexOf(payload), 1);
  },
};

const actions = {
  setAdmin({ commit }, payload) {
    commit('setAdmin', payload);
  },
  removeAdmin({ commit }) {
    commit('removeAdmin');
  },
  setSelectedUser({ commit }, payload) {
    commit('setSelectedUser', payload);
  },
  setStatusOnline({ commit }, payload) {
    commit('setStatusOnline', payload);
  },
  setStatusOffline({ commit }, payload) {
    commit('setStatusOffline', payload);
  },
  addFriend({ commit }, payload) {
    commit('addFriend', payload);
  },
  removeFriend({ commit }, payload) {
    commit('removeFriend', payload);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
