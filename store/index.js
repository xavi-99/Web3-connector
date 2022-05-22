// holds your root state
export const state = () => ({
  counter: 0,
  wallet: '',
});

// contains your actions
export const actions = {
  walletUpdate({ state, commit, text }) {
    debugger;
    commit('setWallet', text);
  },
};
// contains your mutations
export const mutations = {
  setWallet(state, value) {
    state.wallet = value;
  },
};
// your root getters
// export const getters = {
//   myGetter(state) {
//     return state.counter + 1000;
//   },
// };
