<template>
  <b-container>
    <b-row>
      <Logo />
    </b-row>

    <b-row class="fluid">
      <b-col>
        <h1>Wallet Connector</h1>
      </b-col>
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
</template>

<script>
import Button from '../components/Button.vue';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  methods: {
    ConnectToMetamask: () => {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask is installed!');
        this.$store.commit('walletUpdate');
      }
      window.ethereum.request({ method: 'eth_requestAccounts' });
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
