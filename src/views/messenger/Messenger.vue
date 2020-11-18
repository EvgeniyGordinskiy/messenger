<template>
  <div class="messenger-wrapper">
    <div class="messenger">
      <div class="messenger--sidebar">
        <template v-for="recipient of recipients">
          <Recipient
            @click.native="onSelectRecipient(recipient)"
            :currentRecipient="currentRecipient"
            :key="recipient.id"
            :name="typeof recipient.id === 'string' ? getGroupName(recipient.id) : recipient.name"
            :avatar="recipient.avatar"
            :isSelected="currentRecipient && currentRecipient.id === recipient.id"
          />
        </template>
      </div>
      <div class="messenger--main">
        <div class="messenger--main--history" ref="history">
          <HistoryItem v-for="item in messages" :key="item.id" :item="item">
            <div class="history-item--content--user-info">
              <img
                class="avatar"
                width="25"
                height="25"
                :src="item.senderId === user.id ? user.avatar : fetchUserDataById(item.senderId, 'avatar')"
              />
              <span>{{ getUserNameById(item.senderId) }}</span>
            </div>
            <div class="text">{{ item.text }}</div>
          </HistoryItem>
        </div>
        <div class="messenger--main--input">
          <InputMsg @add-message="addMessageToHistory" :recipient="currentRecipient" :isEnabled="!!currentRecipient" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { get, find } from 'lodash'
import Recipient from '@/views/messenger/components/Recipient'
import InputMsg from '@/views/messenger/components/inputMsg/InputMsg'
import HistoryItem from '@/views/messenger/components/historyItem/HistoryItem'

export default {
  name: 'messenger',
  components: { HistoryItem, InputMsg, Recipient },
  data() {
    return {
      user: {
        id: 0,
        name: 'Santa',
        avatar: require('../../assets/santaAvatar.png'),
      },
      history: {
        1: [
          {
            senderId: 1,
            date: new Date(),
            text: "Hi, Santa! What's the plan?",
          },
        ],
        2: [
          {
            senderId: 2,
            date: new Date(),
            text: 'Hi, Santa! Are we ready to go?',
          },
        ],
        '1,2': [
          {
            senderId: 2,
            date: new Date(),
            text: "Hi, It's a group chat!",
          },
        ],
      },
      recipients: [
        {
          id: 1,
          name: 'Tickle',
          avatar: require('../../assets/elfAvatar.png'),
        },
        {
          id: 2,
          name: 'Rudolph',
          avatar: require('../../assets/deerAvatar.png'),
        },
        {
          id: '1,2',
          name: '',
          avatar: require('../../assets/no_avatar.png'),
        },
      ],
      currentRecipient: null,
      messageText: '',
    }
  },
  computed: {
    messages() {
      return get(this.history, this.currentRecipient?.id, [])
    },
  },
  methods: {
    onSelectRecipient(recipient) {
      this.currentRecipient = recipient
      this.scrollHistoryToBottom()
    },
    addMessageToHistory(message) {
      const recipientId = get(this.currentRecipient, 'id')

      if (recipientId && message.length) {
        const messages = get(this.history, recipientId, [])
        messages.push({
          date: Date.now(),
          text: message,
          senderId: this.user.id,
        })
        this.$set(this.history, recipientId, messages)
        this.scrollHistoryToBottom()
      }
    },
    getUserNameById(id) {
      if (id === this.user.id) {
        return this.user.name
      }
      return this.fetchUserDataById(id)
    },

    fetchUserDataById(id, field = 'name') {
      return get(find(this.recipients, { id: Number(id) }), field, '')
    },

    scrollHistoryToBottom() {
      this.$nextTick(() => {
        this.$refs.history.scrollTop = this.$refs.history.scrollHeight
      })
    },

    getGroupName(id) {
      let name = ''
      const ids = id.split(',')

      ids.forEach((i, index) => {
        if (index == !0 && index < ids.length) {
          name += ', '
        }
        name += this.fetchUserDataById(i)
      })

      return name
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
      overflow: auto;
    }
  }
}
</style>
