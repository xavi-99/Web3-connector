<template>
    <div class="wrapper">
        <HeaderComponent></HeaderComponent>
        <b-container>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <Button btn-text="Connect To Web3" btn-class="button--green" :callback="initWeb3"></Button>
                    </b-col>
                </b-row>
                <b-row>
                    <JsonPrintter :content="getInstance"> </JsonPrintter>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import Web3 from 'web3'
import { mapGetters, mapMutations } from 'vuex'
import Button from '../components/Button.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import JsonPrintter from '../components/JsonPrintter.vue'

export default {
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        JsonPrintter,
        HeaderComponent,
    },
    computed: {
        ...mapGetters({
            getInstance: 'web3/getInstance',
            getTitle: 'web3/getTitle',
        }),
        web3() {
            return this.getInstance
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
                    await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    // Get node info
                    const web3 = new Web3(window.ethereum)
                    const networkId = await web3.eth.getChainId()
                    const coinbase = await web3.eth.getCoinbase()
                    const balance = await web3.eth.getBalance(coinbase)
                    // Send it to the store
                    this.setInstance({
                        networkId,
                        coinbase,
                        balance,
                    })
                } catch (error) {}
            }
        },
    },
}
</script>
