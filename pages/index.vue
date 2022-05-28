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
          btnText="Connect To Web3"
          btnClass="button--green"
          :callback="initWeb3"
        ></Button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Button from '../components/Button.vue';
import Web3 from 'web3';
import { mapGetters, mapMutations } from 'vuex';

export default {
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Button,
  },
  computed: {
    ...mapGetters({
      getInstance: 'web3/getInstance',
    }),
    web3() {
      return this.getInstance;
    },
  },
  methods: {
    ...mapMutations({
      setInstance: 'web3/setInstance',
    }),
    async initWeb3() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Ask for connection
          const accounts = await ethereum.request({
            method: 'eth_requestAccounts',
          });
          // Get node info
          const web3 = new Web3(window.ethereum);
          const networkId = await web3.eth.getChainId();
          const coinbase = await web3.eth.getCoinbase();
          const balance = await web3.eth.getBalance(coinbase);
          // Send it to the store
          this.setInstance({
            networkId,
            coinbase,
            balance,
          });
        } catch (error) {}
      }
    },
  },
};
</script>
