<template>
  <div class="recipient-wrapper">
    <div class="recipient" :class="{ isSelected: isSelected }">
      <img :src="avatar" />
      <span>{{ name }}</span>
    </div>
    <div class="separator"></div>
  </div>
</template>

<script>
export default {
  name: 'recipient',
  props: {
    isSelected: {
      required: false,
      type: Boolean,
      default: false,
    },
    avatar: {
      required: true,
      type: String,
    },
    name: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
.recipient-wrapper {
  display: flex;
  flex-direction: column;
  .recipient {
    display: flex;
    height: 70px;
    padding: 9px;

    &:hover {
      cursor: pointer;
      background-color: $color-brand--50;
    }

    span {
      align-self: center;
    }

    img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      align-self: center;
    }
  }
  .isSelected {
    background-color: $color-brand--50;
  }
  .separator {
    height: 2px;
    width: 80%;
    align-self: center;
    background-color: $color-brand--30;
  }
}
</style>
