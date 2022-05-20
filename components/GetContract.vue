<template>

  <div>

    <button :class="btnClass" @click="getContract"> {{ btnText }} </button>


    <button onclick="printCoolNumber();">Print Cool Number</button>
    <button onclick="changeCoolNumber();">Change Cool Number</button>
  </div>

</template>

<script>

import contract_ABI from "../assets/contract_ABI.json";
export default {
  props: ['btnText','btnClass'],
  methods: {
    loadContract:() => {
      return await new window.web3.eth.Contract(contract_ABI);
    },
    async printCoolNumber: () => {
          updateStatus('fetching Cool Number...');
          const coolNumber = await window.contract.methods.coolNumber().call();
          updateStatus(`coolNumber: ${coolNumber}`);
    },
    async getCurrentAccount: () => {
            const accounts = await window.web3.eth.getAccounts();
            return accounts[0];r
        },
    async changeCoolNumber: () => {

            const value = Math.floor(Math.random() * 100);
            updateStatus(`Updating coolNumber with ${value}`);
            const account = await getCurrentAccount();
            const coolNumber = await window.contract.methods.setCoolNumber(value).send({ from: account });
            updateStatus('Updated.');
        },
        async load: () => {
            window.contract = await loadContract();
            updateStatus('Ready!');
        },
        updateStatus: () => (status) => {
            const statusEl = document.getElementById('status');
            statusEl.innerHTML = status;
            console.log(status);
        }
  }
}
</script>

<style>

</style>

