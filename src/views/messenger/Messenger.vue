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
            :isSelected="currentRecipient && currentRecipient.id === recipient.id"
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
          <InputMsg @add-message="addMessageToHistory" :recipient="currentRecipient" :isEnabled="!!currentRecipient" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get } from 'lodash'
import Recipient from '@/views/messenger/components/Recipient'
import InputMsg from '@/views/messenger/components/InputMsg'

export default {
  name: 'messenger',
  components: { InputMsg, Recipient },
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
    addMessageToHistory(message) {
      const recipientId = get(this.currentRecipient, 'id')

      if (recipientId && message.length) {
        const messages = get(this.history, recipientId, [])
        messages.push({
          recipientId,
          date: new Date(),
          text: message,
          senderId: this.user.id,
        })
        this.$set(this.history, recipientId, messages)
      }
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
  display: flex;
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
    min-width: 230px;
    background-color: $color-brand--40;
    border-right: 1px solid $color-brand--50;
    border-top-left-radius: 3px;
    border-bottom-left-radius: 3px;
  }
  &--main {
    position: relative;
    background-color: $color-white;
    width: 600px;
    &--history {
      height: calc(100% - 86px);
      padding: 10px;
    }
  }
}
</style>
