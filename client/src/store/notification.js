import { notificationController } from '../api';

const state = {
  notifications: [],
};

const getters = {
  allNotifications(state) {
    return state.notifications;
  },
  unreadNotifications(state) {
    return state.notifications.filter(ele => !ele.isRead);
  },
};

const mutations = {
  storeNotification(state, payload) {
    if (
      payload.notificationType !== 'like'
      && payload.notificationType !== 'review'
      && payload.notificationType !== 'friend'
      && payload.notificationType !== 'review-like'
    ) return;
    function generateText(payload) {
      if (payload.notificationType === 'like') {
        payload.text = `${payload.user.fullName} liked on your product with title ${payload.product.title}.`;
        payload.link = `/products/${payload.product._id}`;
      } else if (payload.notificationType === 'review') {
        payload.text = `${payload.user.fullName} reviewed your product with title ${payload.product.title}.`;
        payload.link = `/products/${payload.product._id}`;
      } else if (payload.notificationType === 'friend') {
        payload.text = `${payload.user.fullName} added you in contact list.`;
        payload.link = `/profile/${payload.user._id}`;
      } else if (payload.notificationType === 'review-like') {
        payload.text = `${payload.user.fullName} Liked your review on a product with title ${payload.product.title}.`;
        payload.link = `/products/${payload.product._id}`;
      }
    }
    generateText(payload);
    state.notifications.unshift(payload);
  },
  markAsRead(state, payload) {
    payload.forEach((x) => {
      state.notifications.find(ele => ele._id == x).isRead = true;
    });
  },
  clearAllNotifications(state, payload) {
    payload.forEach((x) => {
      state.notifications.splice(state.notifications.indexOf(state.notifications.find(ele => ele._id == x)), 1);
    });
  },
};

const actions = {
  getNotificationsFromServer({ commit }) {
    notificationController.getNotifications().then(({ data }) => {
      data.forEach((notification) => {
        commit('storeNotification', notification);
      });
    });
  },
  storeLiveNotification({ commit }, payload) {
    commit('storeNotification', payload);
  },
  markAsRead({ commit }, payload) {
    notificationController.markAsRead(payload).then(({ data, status }) => {
      if (status === 200) {
        commit('markAsRead', data);
      }
    });
  },
  clearAllNotifications({ commit }, payload) {
    notificationController.deleteNotifications(payload).then(({ data }) => {
      commit('clearAllNotifications', data);
    });
  },
};


export default {
  state,
  getters,
  mutations,
  actions,
};
