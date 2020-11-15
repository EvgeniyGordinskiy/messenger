<template>
  <div class="messenger-page">
    <div class="messenger-page--sidebar">
      <ul>
        <li @click="currentRecipient = { id: 1, name: 'John' }">
          <span>John</span>
          <img src="../../assets/no_avatar.png" />
        </li>
        <li @click="currentRecipient = { id: 2, name: 'Drone' }">
          <span>Drone</span>
          <img src="@/assets/no_avatar.png" />
        </li>
      </ul>
    </div>
    <div class="messenger-page--main">
      <div class="messenger-page--main--history">
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
      <div class="messenger-page--main--input">
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
</template>
<script>
import { get } from 'lodash'
import { Picker } from 'emoji-mart-vue'
export default {
  name: 'messenger',
  components: { Picker },
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
.messenger-page {
  margin: 20px auto;
  width: 800px;
  height: 600px;

  overflow: hidden;
  border-radius: 3px;

  &--sidebar,
  &--main {
    height: 100%;
  }
  &--sidebar {
    float: left;
    width: 200px;
  }
  &--main {
    position: relative;
    overflow: hidden;
    background-color: #eee;
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
