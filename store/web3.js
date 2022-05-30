import Web3 from 'web3'

const web3 = {
    namespaced: true,
    state: () => ({
        web3: null,
        title: 'To do list with Blockchain',
    }),
    getters: {
        getTitle: (state) => {
            return state.title
        },
    },
    mutations: {
        SET_WEB3(state, value) {
            state.web3 = value
        },
    },
    actions: {
        async initWeb3() {
            // Check for web3 provider
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Ask to connect
                    await window.ethereum.request({ method: 'eth_requestAccounts' })
                    const web3 = new Web3(window.ethereum)
                    this.commit('web3/SET_WEB3', web3)
                } catch (error) {
                    // User denied account access
                    console.error('User denied web3 access', error)
                }
            }
            // No web3 provider
            else {
                console.error('No web3 provider detected')
            }
        },
    },
}

export default web3
