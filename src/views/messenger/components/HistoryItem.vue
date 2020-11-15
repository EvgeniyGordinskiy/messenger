<template>
  <div class="history-item">
    <div class="history-item--content">
      <slot />
    </div>
    <span>{{ item.date | time }}</span>
  </div>
</template>

<script>
export default {
  name: 'historyItem',
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  filters: {
    time(date) {
      if (typeof date === 'string') {
        date = new Date(date)
      }
      return date.getHours() + ':' + date.getMinutes()
    },
  },
}
</script>
<style lang="scss" scoped>
.history-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  &--content {
    &--user-info {
      display: flex;
      img {
        width: 40px;
        height: 40px;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        color: $color-brand--50;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
</style>
