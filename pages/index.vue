<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Metamask Connector</h1>
      <div class="links">
        <Button
          btnText="Connect To Metamask"
          btnClass="button--green"
          :click="metamaskConnect"
        ></Button>
        <Button
          btnText="Connect with WallectConnect"
          btnClass="button--grey"
          :click="walletConnect"
        ></Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../components/Button";
export default {
  components: {
    Button,
  },
  methods: {
    metamaskConnect: () => {
      console.log("Connect Metamask");
    },
    walletConnect: () => {
      console.log("Wallet Metamask");
    },
  },
};
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.links button {
  background-color: transparent;
}
</style>
