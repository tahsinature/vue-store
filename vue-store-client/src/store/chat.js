import { chatController } from '../api';


const state = {
  conversation: [],
  selectedConversation: undefined, // messages[], partner{}, _id
};

const getters = {
  chats(state) {
    return state.conversation;
  },
  selectedConversation(state) {
    return state.selectedConversation;
  },
};

const mutations = {
  loadChats(state, payload) {
    state.conversation = payload;
    if (!state.selectedConversation) state.selectedConversation = payload[0];
    else {
      state.selectedConversation = payload.find(ele => ele._id == state.selectedConversation._id);
    }
  },
  setSelectedConversation(state, payload) {
    state.selectedConversation = state.conversation.find(ele => ele._id == payload);
  },
  storeSentMessage(state, payload) {
    if (payload.conversation) payload.conversation.messages.push(payload.data);
  },
  setStatusOnline(state, payload) {
    const conversation = state.conversation.find(ele => ele.partner._id == payload);
    if (conversation) conversation.partner.isOnline = true;
  },
  setStatusOffline(state, payload) {
    const conversation = state.conversation.find(ele => ele.partner._id == payload);
    if (conversation) conversation.partner.isOnline = false;
  },
};

const actions = {
  retriveChats({ commit }) {
    chatController.getChats().then(({ data }) => {
      commit('loadChats', data);
    });
  },
  setSelectedConversation({ commit }, payload) {
    commit('setSelectedConversation', payload);
  },
  sendMessage({ commit }, payload) {
    const conversation = state.selectedConversation;
    chatController.sendMessage(payload).then(({ data, status }) => {
      if (status === 200) {
        commit('storeSentMessage', { conversation, data });
      }
    });
  },
  setStatusOnline({ commit }, payload) {
    commit('setStatusOnline', payload);
  },
  setStatusOffline({ commit }, payload) {
    commit('setStatusOffline', payload);
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
