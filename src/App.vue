<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
#app {
  height: 100%;
  background: repeating-linear-gradient(
    to right,
    $color-brand--30,
    $color-brand--30 5px,
    $color-brand--10 5px,
    $color-brand--10 10px
  );
}
</style>
