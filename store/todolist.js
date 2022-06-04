import TodoList from '../build/contracts/TodoList.json'

const contractAddress = '0xb34BE00849D38c27F0309FF909C10cD8d5f94508'
const todoList = {
    namespaced: true,
    state: () => ({
        tasks: [],
        contract: null,
        contractInstance: null,
    }),
    getters: {
        getTasks: (state) => {
            return state.tasks
        },
        getContract: (state) => {
            return state.contract
        },
    },
    mutations: {
        setTasks(state, value) {
            state.tasks = value
        },
        setContract(state, value) {
            state.contract = value
        },
        setTask(state, task) {
            state.task = task
        },
    },
    actions: {
        setContract({ commit, rootState }) {
            const web3 = rootState.web3.web3
            const contract = new web3.eth.Contract(TodoList.abi, contractAddress)
            commit('setContract', contract)
        },
        getTasks({ commit }) {
            const contract = this.state.todolist.contract
            contract.methods
                .sayHello()
                .call()
                .then((tasks) => {
                    commit('setTasks', tasks)
                })
        },
    },
}

export default todoList
