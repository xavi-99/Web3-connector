<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">Metamask Connector</h1>
      <div class="links">
        <MetamaskConnectButton
          btnText="Connect To Metamask"
          btnClass="button--green"
        ></MetamaskConnectButton>
        <WalletConnectButton
          btnText="Connect with WallectConnect"
          btnClass="button--grey"
        ></WalletConnectButton>
      </div>
    </div>
  </div>
</template>

<script>
import MetamaskConnectButton from "../components/MetamaskConnectButton";
import WalletConnectButton from "../components/WalletConnectButton";
export default {
  components: {
    MetamaskConnectButton,
    WalletConnectButton,
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
