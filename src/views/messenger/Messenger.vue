<template>
  <div class="messenger-wrapper">
    <div class="messenger">
      <div class="messenger--sidebar">
        <template v-for="recipient of recipients">
          <Recipient
            @click.native="currentRecipient = recipient"
            :currentRecipient="currentRecipient"
            :key="recipient.id"
            :name="recipient.name"
            :avatar="recipient.avatar"
            :isSelected="currentRecipient && (currentRecipient.id === recipient.id)"
          />
        </template>
      </div>
      <div class="messenger--main">
        <div class="messenger--main--history">
          <ul>
            <li v-for="item in messages" :key="item.id">
              <p class="time">
                <span>{{ item.date | time }}</span>
              </p>
              <div class="main" :class="{ self: item.senderId === user.id }">
                <img
                  class="avatar"
                  width="25"
                  height="25"
                  :src="item.senderId === user.id ? user.img : currentRecipient.user.img"
                />
                <div class="text">{{ item.text }}</div>
              </div>
            </li>
          </ul>
        </div>
        <div class="messenger--main--input">
          <form @submit.prevent="addMessageToHistory"></form>
          <div
            :contenteditable="!!currentRecipient"
            ref="textInput"
            @keydown.enter="addMessageToHistory"
            @input="messageText = $event.target.innerText"
          ></div>
          <Picker
            :show-preview="false"
            :show-skin-tones="false"
            :show-categories="false"
            :show-search="false"
            native
            @select="emojiPicked"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'
import { Picker } from 'emoji-mart-vue'
import Recipient from '@/views/messenger/components/Recipient'
export default {
  name: 'messenger',
  components: { Recipient, Picker },
  data() {
    return {
      user: {
        id: 0,
        name: 'Johnny',
        img: require('../../assets/no_avatar.png'),
      },
      history: {},
      recipients: [
        {
          id: 1,
          name: 'John Doe',
          avatar: require('../../assets/no_avatar.png'),
        },
        {
          id: 2,
          name: 'Job Doe',
          avatar: require('../../assets/no_avatar.png'),
        },
      ],
      currentRecipient: null,
      messageText: '',
    }
  },
  filters: {
    time(date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes()
    },
  },
  computed: {
    messages() {
      return get(this.history, this.currentRecipient?.id, [])
    },
  },
  methods: {
    addMessageToHistory(e) {
      if (e.shiftKey) {
        return
      }

      e.preventDefault()
      const recipientId = get(this.currentRecipient, 'id')

      if (recipientId && this.messageText.length) {
        const messages = get(this.history, recipientId, [])
        messages.push({
          recipientId,
          date: new Date(),
          text: this.messageText,
          senderId: this.user.id,
        })
        this.$set(this.history, recipientId, messages)
        this.$refs.textInput.innerText = ''
        this.messageText = ''
      }
    },
    emojiPicked(emoji) {
      this.messageText += emoji.native
      this.$refs.textInput.innerText += emoji.native
    },
  },
}
</script>

<style lang="scss" scoped>
.messenger-wrapper {
  display: flex;
  height: 100%;
}
.messenger {
  margin: 0 auto;
  width: 800px;
  height: 600px;
  align-self: center;
  box-shadow: 0 0 3px 1px $color-white;
  border-radius: 3px;

  &--sidebar,
  &--main {
    height: 100%;
  }
  &--sidebar {
    float: left;
    width: 230px;
    background-color: $color-brand--40;
    border-right: 1px solid $color-brand--50;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &--main {
    position: relative;
    overflow: hidden;
    background-color: $color-white;
    &--history {
      height: calc(100% - 160px);
    }
    &--input {
      position: absolute;
      width: 100%;
      height: 160px;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
