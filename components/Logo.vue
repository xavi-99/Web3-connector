<template>
  <img v-if="$store.state.wallet" class="logo" :src="logoSrc" />
</template>

<script>
export default {
  computed: {
    logoSrc() {
      return require('../assets/' +
        this.$store.state.wallet +
        '.svg');
    },
  },
};
</script>

<style></style>
<style>
.logo {
  animation: 1s appear;
  margin: auto;
  width: 300px;
}

@keyframes appear {
  0% {
    opacity: 0;
  }
}
</style>
