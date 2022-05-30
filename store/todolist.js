import TodoList from '../build/contracts/TodoList.json'

const contractAddress = '0x64E7043D182B1e531e7249348eb6293a80dA97c3'
const todoList = {
    namespaced: true,
    state: () => ({
        tasks: [],
        contract: null,
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
