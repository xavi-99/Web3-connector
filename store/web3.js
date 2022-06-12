import { ethers } from 'ethers'

const web3 = {
    namespaced: true,
    state: () => ({
        activeAccount: null,
        chainId: null,
        chainName: null,
        isConnected: false,
        provider: null,
    }),
    getters: {
        getActiveAccount(state) {
            return state.activeAccount
        },

        getActiveBalanceEth(state) {
            return ethers.utils.formatEther(state.activeBalance)
        },
        getChainId(state) {
            return state.chainId
        },
        getChainName(state) {
            return state.chainName
        },
        getProviderEthers(state) {
            return state.provider
        },
        isUserConnected(state) {
            return state.isConnected
        },
    },
    mutations: {
        async disconnectWallet(state) {
            state.activeAccount = null
            state.activeBalance = 0
            state.provider = null
        },

        setActiveAccount(state, selectedAddress) {
            state.activeAccount = selectedAddress
        },

        setChainData(state, chainId) {
            state.chainId = chainId

            switch (chainId) {
                case '0x1':
                    state.chainName = 'Mainnet'
                    break
                case '0x2a':
                    state.chainName = 'Kovan'
                    break
                case '0x3':
                    state.chainName = 'Ropsten'
                    break
                case '0x4':
                    state.chainName = 'Rinkeby'
                    break
                case '0x5':
                    state.chainName = 'Goerli'
                    break
                case '0x539': // 1337 (often used on localhost)
                case '0x1691': // 5777 (default in Ganache)
                default:
                    state.chainName = 'Localhost'
                    break
            }
        },

        setEthersProvider(state, _provider) {
            state.provider = _provider
        },

        setIsConnected(state, isConnected) {
            state.isConnected = isConnected
        },
    },
    actions: {
        async connectWallet({ commit }) {
            try {
                const { ethereum } = window

                if (!ethereum) {
                    console.log('please install MetaMask')
                }

                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                const chainId = await ethereum.request({ method: 'eth_chainId' })
                commit('setActiveAccount', accounts[0])
                commit('setIsConnected', true)
                commit('setChainData', chainId)
            } catch (error) {
                console.log(error)
            }
        },
        async disconnectWeb3({ commit }) {},
    },
}

export default web3
