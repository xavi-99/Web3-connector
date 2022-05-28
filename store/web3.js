const web3 = {
    namespaced: true,
    state: () => ({
        web3: {
            networkid: null,
            coinbase: null,
            balance: null,
        },
        title: 'To do list with Blockchain',
    }),
    getters: {
        getInstance: (state) => {
            return state.web3
        },
        getTitle: (state) => {
            return state.title
        },
    },
    mutations: {
        setInstance(state, value) {
            state.web3 = value
        },
    },
}

export default web3
