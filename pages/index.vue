<template>

  <b-container>

    <div>

      <Logo />

    </div>

    <b-container class="fluid">

      <b-row>

        <h1 class="title">Metamask Connector</h1>

      </b-row>

      <b-row>

        <b-col>

          <Button
            btnText="Connect To Metamask"
            btnClass="button--green"
            :callback="ConnectToMetamask"
          ></Button>

        </b-col>

        <b-col>

          <Button
            btnText="Connect with WallectConnect"
            btnClass="button--grey"
            :callback="connectToWallet"
          ></Button>

        </b-col>

      </b-row>

    </b-container>

  </b-container>

</template>

<script>
import Button from '../components/Button.vue';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
export default {
  components: {
    Button,
  },
  methods: {
    ConnectToMetamask: () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
      }
      ethereum.request({ method: 'eth_requestAccounts' });
    },
    connectToWallet: () => {
      const connector = new WalletConnect({
        bridge: 'https://bridge.walletconnect.org', // Required
        qrcodeModal: QRCodeModal,
      });

      // Check if connection is already established
      if (!connector.connected) {
        // create new session
        connector.createSession();
      }

      // Subscribe to connection events
      connector.on('connect', (error, payload) => {
        if (error) {
          throw error;
        }

        // Get provided accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });

      connector.on('session_update', (error, payload) => {
        if (error) {
          throw error;
        }

        // Get updated accounts and chainId
        const { accounts, chainId } = payload.params[0];
      });

      connector.on('disconnect', (error, payload) => {
        if (error) {
          throw error;
        }

        // Delete connector
      });
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
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system,
    BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
    sans-serif;
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

