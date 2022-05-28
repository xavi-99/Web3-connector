const web3 = {
    namespaced: true,
    state: () => ({
        web3: null,
        // web3: {
        //     networkid: null,
        //     coinbase: null,
        //     balance: null,
        // },
        title: 'To do list with Blockchain',
        todoListResponse: null,
    }),
    getters: {
        getInstance: (state) => {
            return state.web3
        },
        getTitle: (state) => {
            return state.title
        },
        getTodoListResponse: (state) => {
            return state.todoListResponse
        },
    },
    mutations: {
        setInstance(state, value) {
            state.web3 = value
        },
        setTodoListResponse(state, value) {
            state.todoListResponse = value
        },
    },
}

export default web3
