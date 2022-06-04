const web3 = {
    namespaced: true,
    state: () => ({
        account: null,
        error: null,
        contract_address: '0xb34BE00849D38c27F0309FF909C10cD8d5f94508',
        title: 'To do list with Blockchain',
    }),
    getters: {
        getTitle: (state) => state.title,
        account: (state) => state.account,
        error: (state) => state.error,
    },
    mutations: {
        setAccount(state, account) {
            state.account = account
        },
        setError(state, error) {
            state.error = error
        },
    },
    actions: {
        async connect({ commit, dispatch }, connect) {
            try {
                const { ethereum } = window
                if (!ethereum) {
                    commit('setError', 'There is no wallet available')
                    return
                }
                if (!(await dispatch('checkIfConnected')) & connect) {
                    await dispatch('requestAccess')
                }
                await dispatch('checkNetwork')
            } catch (error) {
                console.log(error)
                commit('setError', 'Account request refused')
            }
        },
        async checkNetwork({ commit, dispatch }) {
            const { ethereum } = window
            const chainId = await ethereum.request({ method: 'eth_chainId' })
            const rinkebyChainId = '0x4'

            // We want to work only with Rinkeby net
            if (chainId !== rinkebyChainId) {
                const isRinkebyChainId = await dispatch('switchNetwork')
                if (!isRinkebyChainId) {
                    commit('setError', 'You are not connected to the Rinkeby Network')
                }
            }
        },
        async switchNetwork() {
            const { ethereum } = window
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x4' }],
                })
                return 1
            } catch (switchError) {
                return 0
            }
        },
        async checkIfConnected({ commit }) {
            const { ethereum } = window
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            const isAccount = accounts.length !== 0
            if (isAccount) commit('setAccount', accounts[0])
            return isAccount
        },
        async requestAccess({ commit }) {
            const { ethereum } = window
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts',
            })
            commit('setAccount', accounts[0])
        },
    },
}

export default web3
