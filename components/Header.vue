<template>
    <header class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Hardhat Vue Starter</a>
        <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">Connected chain : {{getChainName}}</a>

        <button
            class="navbar-toggler position-absolute d-md-none collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarMenu"
            aria-controls="sidebarMenu"
            aria-expanded="false"
            aria-label="Toggle navigation"
        >
            <span class="navbar-toggler-icon"></span>
        </button>

        <ul class="navbar-nav px-3">
            <li class="nav-item text-nowrap">
                <a class="nav-link" href="#" v-if="!isUserConnected" @click="connectWallet">Connect your wallet</a>
                <a class="nav-link" href="#" v-if="isUserConnected" @click="disconnectWeb3"
                    >Disconnect {{ getActiveAccount.substring(0, 7) }}...</a
                >
            </li>
        </ul>
    </header>
</template>

<script>
import Button from '../components/Button.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
    },
    computed: {
        ...mapGetters('web3', ['getActiveAccount', 'isUserConnected', 'getWeb3Modal','getChainName']),
    },
    created() {
        // this.$store.dispatch('web3/connectWallet')
    },
    methods: {
        ...mapActions('web3', ['connectWallet', 'disconnectWeb3']),
    },
}
</script>
