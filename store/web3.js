const web3 = {
  namespaced: true,
  state: () => ({
    web3: {
      networkid: null,
      coinbase: null,
      balance: null,
    },
  }),
  getters: {
    getInstance: (state) => {
      return state.web3;
    },
  },
  mutations: {
    setInstance(state, value) {
      state.web3 = value;
    },
  },
};

export default web3;
