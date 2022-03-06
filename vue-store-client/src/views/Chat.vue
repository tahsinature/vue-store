<template>
  <div class="container mt-4">
    <div class="header">
      <h1>Messages</h1>
    </div>
    <div class="chat-app" v-if="selectedConversation">
      <div class="partner-list" v-if="mode === 'list' || !ismobileMode">
        <div
          v-for="chat in chats"
          :key="chat._id"
          class="chat-tile"
          :class="{active: chat._id === selectedConversation._id}"
          @click="changeSelectedConversation(chat._id); mode = 'display'"
        >
          <div class="chat-tile__img-box">
            <img v-lazy="chat.partner.profilePhoto.url">
          </div>
          <div class="chat-tile__partnerName">
            <p>{{chat.partner.fullName}}</p>
          </div>
        </div>
      </div>
      <div class="chat-display" v-if="mode === 'display' || !ismobileMode">
        <div class="chat-display--back-button" v-if="ismobileMode">
          <button @click="mode = 'list'">Show Message List</button>
        </div>
        <div class="chat-display__header">
          <p>Chat With
            <router-link :to="'profile/' + selectedConversation.partner._id">
              <strong>{{selectedConversation.partner.fullName}}</strong>
            </router-link>
          </p>
          <p
            class="d-flex align-items-center"
            :class="{'text-muted': !selectedConversation.partner.isOnline}"
          >
            <i
              class="fas fa-circle mr-1"
              :style="{color: selectedConversation.partner.isOnline ? 'green' : '#820404a3'}"
            ></i>
            {{selectedConversation.partner.isOnline ? 'Online': 'Offline'}}
          </p>
        </div>
        <div
          class="chat-display__messages"
          v-chat-scroll="{always: true, smooth: false, scrollonremoved:true}"
        >
          <p class="text-center mt-3 mb-3 text-muted">Conversation Started</p>
          <div
            v-for="msg in selectedConversation.messages"
            :key="msg._id"
            class="chat-display__message"
            :class="{'my-text': msg.author == getAdmin._id, 'partner-text': msg.author != getAdmin._id}"
          >
            <p>{{msg.text}}</p>
          </div>
        </div>
        <div class="control">
          <input
            type="text"
            v-model="newMessage.text"
            @focus="newMessage.partnerId = selectedConversation.partner._id"
            @keyup.enter="sendMessage"
          >
          <button
            :disabled="!newMessage.text"
            @click="sendMessage"
            :style="{cursor: newMessage.text ? 'pointer' : 'not-allowed', color: newMessage.text ? '#2f9e76' : '#6c757d82'}"
          >Send</button>
        </div>
      </div>
    </div>
    <div v-else class="no-msg">
      <h1>No Conversation</h1>
      <p>You can send messages either from your contact list or, visiting a user profile.</p>
    </div>
  </div>
</template>

<script>
import socket from 'socket.io-client';
import { mapGetters } from 'vuex';
import eventBus from '../main';
import store from '../store/store';
import config from '../config';

const socketOn = socket(config.apiURL);

export default {
  data() {
    return {
      myMessages: [],
      partnerMessages: [],
      newMessage: {
        partnerId: undefined,
        text: undefined,
      },
      ismobileMode: window.innerWidth <= 768,
      mode: 'list',
    };
  },
  watch: {
    selectedConversation: {
      deep: true,
      handler() {
        this.myMessages = this.selectedConversation.messages.filter(
          ele => ele.author == this.getAdmin._id,
        );
        this.partnerMessages = this.selectedConversation.messages.filter(
          ele => ele.author == this.selectedConversation.partner._id,
        );
      },
    },
    chats() {},
  },
  methods: {
    retriveChats() {
      this.$store.dispatch('retriveChats');
    },
    changeSelectedConversation(id) {
      this.$store.dispatch('setSelectedConversation', id);
    },
    sendMessage() {
      const text = this.newMessage.text;
      if (!text) return;
      const newMessageCopy = { partnerId: this.newMessage.partnerId };
      newMessageCopy.text = text;
      this.$store.dispatch('sendMessage', newMessageCopy);
      this.newMessage.text = '';
    },
  },
  computed: {
    ...mapGetters(['chats', 'selectedConversation', 'getAdmin']),
  },
  created() {
    window.addEventListener('resize', () => {
      this.ismobileMode = window.innerWidth <= 768;
    });
    this.$store.dispatch('retriveChats');
  },
  mounted() {
    socketOn.addEventListener('onNewMessage', () => {
      this.$store.dispatch('retriveChats');
    });
    socketOn.addEventListener('userOnline', (id) => {
      this.$store.dispatch('setStatusOnline', id);
    });
    socketOn.addEventListener('userOffline', (id) => {
      this.$store.dispatch('setStatusOffline', id);
    });
  },
  beforeRouteEnter(to, from, next) {
    if (!store.getters.isLoggedIn) {
      next('/login');
      return eventBus.$emit('onNotify', {
        title: 'Please login first',
        text: "You've to login first to chat.",
        type: 'error',
      });
    }
    next();
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/sass/main";
.header {
  background: #ffffff66;
  border: 5px solid #fff;
  margin: 1rem 0;
  padding: 1rem;
  color: #505050db;
  text-align: center;
  border-radius: 5px;
  font-family: "ZCOOL QingKe HuangYou", cursive;

  h1 {
    font-size: 34px;
    margin: 0;
  }
}
.chat-app {
  display: flex;
  background: #fff;
  height: 70vh;
  padding: 1.5rem 1rem;
  & > * {
    border-radius: 5px;
    border: 2px solid #e7edee;
  }
}
.partner-list {
  margin-right: 1rem;
  overflow: hidden;
  width: 300px;
  color: #565656;
  @include respond(df, tab-p) {
    margin-right: 0;
    width: 100%;
  }
  .chat-tile.active {
    background: #e7edee;
    @include respond(mf, tab-p) {
      color: #6385ff;
    }
  }
  .chat-tile {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    cursor: pointer;
    transition: all 0.2s;
    &:hover {
      background: #2f9e76;
      color: #fff;
    }
    &:not(:last-of-type) {
      border-bottom: 1px solid #e7edee;
    }
    .chat-tile__img-box {
      width: 50px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.4rem;
      height: 50px;
      img {
        width: 100%;
        // height: 100%;
      }
    }
    .chat-tile__partnerName {
      font-weight: bold;
    }
  }
}

.chat-display {
  flex-grow: 1;
  flex-shrink: 9999999999; //this is a punishment for killing my 1 hour 😡😡😡👿
  background: #e7edee;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-size: 0.9rem;
}
.chat-display--back-button {
  // display: none;
  overflow: hidden;
  background: #fff;
  border: 2px solid transparent;
  border-radius: 5px;
  button {
    background: #2f9e76;
    border: none;
    color: #fff;
    padding: 0.5rem;
    width: 100%;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      background: darken($color: #2f9e76, $amount: 5);
    }
  }
  @include respond(df, tab-p) {
    display: block;
  }
}
.chat-display__header {
  padding: 0.5rem 1rem;
  background: #fff;
}

.chat-display__messages {
  // background: red;
  flex-grow: 1;
  flex-shrink: 9999999999; //this is a punishment for killing my 1 hour 😡😡😡👿
  overflow: hidden;
  overflow-y: scroll;
  padding: 0 1.2rem 1rem 1.2rem;

  .my-text p,
  .partner-text p {
    display: inline-block;
    padding: 0.5rem 0.5rem;
    margin: 0.3rem 0;
    border-radius: 10px;
  }
  .my-text {
    text-align: right;
    position: relative;
    p {
      background: #2f9e76;
      color: white;
    }
    &::after {
      content: "";
      position: absolute;
      margin-top: -6px;
      margin-left: -5px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #2f9e76;
      transform: rotate(-45deg);
      right: -9px;
      top: 10px;
    }
  }
  .partner-text {
    p {
      background: #fff;
      color: #000;
    }
    text-align: left;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      margin-top: -4px;
      margin-left: -1px;
      border-left: 12px solid transparent;
      border-right: 12px solid transparent;
      border-bottom: 12px solid #fff;
      transform: rotate(45deg);
      left: -9px;
      top: 10px;
    }
  }
}

.control {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
  height: 3rem;
  background: #fff;
  input {
    flex-grow: 1;
    border-radius: 5px;
    border: 2px solid #e7edee;
    padding: 0 0.5rem;
    &:focus {
      outline: none;
    }
  }
  button {
    background: transparent;
    border: none;
    padding: 0.2rem 0.5rem;
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }
}
.no-msg {
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #565656af;
  text-align: center;
  h1 {
    font-size: 1.3rem;
  }
}
// .online
</style>
