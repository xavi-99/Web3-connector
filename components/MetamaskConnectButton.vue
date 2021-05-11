<template>
  <button :class="btnClass" @click="connect">
    {{ btnText }}
  </button>
</template>

<script>
export default {
  props: ["btnText", "btnClass"],
  methods: {
    connect: () => {
      if (typeof window.ethereum !== "undefined") {
        console.log("MetaMask is installed!");
      }
      ethereum.request({ method: 'eth_requestAccounts' });
    },
  },
};
</script>

<style>
</style>