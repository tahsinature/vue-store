<template>
  <div class="modal-write-message">
    <div class="header">Send Message to
      <router-link :to="'/profile/' + user._id">
        <h2 @click="$emit('closeSendMessage')">{{user.fullName}}</h2>
      </router-link>
      <img v-lazy="user.profilePhoto.url">
    </div>
    <div class="body">
      <label for="message">Write you message</label>
      <textarea
        v-model="newMessage.text"
        name
        id="message"
        cols="30"
        rows="6"
        data-gramm_editor="false"
      ></textarea>
      <button
        :class="{canSend: newMessage.text, canNotSend: !newMessage.text}"
        :disabled="!newMessage.text"
        @click="sendMessage()"
      >Send</button>
    </div>
    <i class="fas fa-times close-button" @click="$emit('closeSendMessage')"></i>
  </div>
</template>

<script>
import eventBus from '../../main';

export default {
  props: ['user'],
  data() {
    return {
      newMessage: {
        partnerId: this.user._id,
        text: undefined,
      },
    };
  },
  methods: {
    sendMessage() {
      this.$store.dispatch('sendMessage', this.newMessage);
      eventBus.$emit('onNotify', {
        title: 'Message Sent Successfully',
        text: `Your message to <u><strong>${
          this.user.fullName
        }</strong> </u>has been sent successfully.`,
        type: 'success',
      });
      this.$emit('closeSendMessage');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/sass/main";
.modal-write-message {
  padding: 2rem;
  position: relative;
}
.header {
  text-align: center;
  margin-bottom: 2rem;
  h2 {
    font-family: "Josefin Sans", sans-serif;
    margin-bottom: 0;
    transition: color 0.4s;
    @include respond(df, mbl) {
      font-size: 1.4rem;
      margin: 0.5rem 0;
    }
    &:hover {
      color: #780ce8;
      cursor: pointer;
    }
  }
  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    border: 3px solid #c2c4c9;
  }
}
.body {
  display: flex;
  flex-direction: column;
  label {
    color: #969696;
  }
  textarea {
    background: #c2c4c9;
    border: none;
    padding: 0.5rem;
    background: rgb(39, 39, 39);
    background-position: center;
    background-size: contain;
    color: #fff;
    &:focus {
      outline: none;
    }
  }
  button {
    margin: auto;
    margin-top: 1rem;
    padding: 0.5rem;
    border: none;
    color: #fff;
    transition: all 0.5s;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
}
.canSend {
  cursor: pointer;
  background: #780ce8;
  &:hover {
    background: #410f75;
  }
}
.canNotSend {
  background: #ff000083;
  cursor: not-allowed;
}
.close-button {
  font-size: 1.5rem;
  position: absolute;
  top: 0;
  right: 0;
  padding: 0.7rem;
  background: red;
  display: inline-block;
  color: #fff;
  border-radius: 0 0 0 50%;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.1);
  }
}
</style>
