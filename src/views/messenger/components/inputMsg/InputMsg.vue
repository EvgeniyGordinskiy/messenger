<template>
  <div class="inputMsg" :class="{ disabled: !isEnabled }">
    <div class="inputMsg-wrapper">
      <div
        :contenteditable="isEnabled"
        ref="textInput"
        class="inputMsg-wrapper--input"
        @keydown.enter="addMessageToHistory"
        @input="messageText = $event.target.innerText"
      >
        <span v-if="!isEnabled">
          Please choose a recipient
        </span>
      </div>
      <div @click="isEnabled ? isEmojiEnabled = !isEmojiEnabled : null" class="inputMsg-wrapper--emoji-btn">☺</div>
    </div>
    <Picker
      v-show="isEmojiEnabled"
      :show-preview="true"
      :show-skin-tones="false"
      :show-categories="true"
      :show-search="false"
      native
      @select="emojiPicked"
    />
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue'

export default {
  name: 'InputMsg',
  components: { Picker },
  props: {
    recipient: {
      required: false,
      default: () => ({}),
    },
    isEnabled: {
      required: false,
      default: false,
    },
  },
  data() {
    return {
      messageText: '',
      isEmojiEnabled: false,
    }
  },
  watch: {
    recipient() {
      this.clearInput()
    },
  },
  methods: {
    addMessageToHistory(e) {
      if (e.shiftKey) {
        return
      }

      e.preventDefault()

      if (this.messageText.length) {
        this.$emit('add-message', this.messageText)
        this.clearInput()
      }
    },
    emojiPicked(emoji) {
      if (this.isEnabled) {
        this.messageText += emoji.native
        this.$refs.textInput.innerText += emoji.native
      }
    },
    clearInput() {
      this.$refs.textInput.innerText = ''
      this.messageText = ''
      this.isEmojiEnabled = false
    },
  },
}
</script>
<style lang="scss" scoped>
.inputMsg {
  .inputMsg-wrapper {
    position: relative;

    &--input {
      height: 80px;
      border-top: 1px solid $color-brand--50;
      border-radius: 3px;
      padding: 5px 22px 5px 5px;
      font-size: 15px;
      overflow: auto;
      outline: none;
    }

    &--emoji-btn {
      position: absolute;
      top: 0;
      right: 0;
      font-size: 25px;
      width: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
}
.disabled {
  color: $color-grey;
  .inputMsg-wrapper {
    &--emoji-btn {
      &:hover {
        cursor: not-allowed;
      }
    }
    &:hover {
      cursor: not-allowed;
    }
  }
}
.emoji-mart {
  position: absolute;
  right: 0;
  top: 95px;
}
</style>
