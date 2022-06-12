import { ethers } from 'ethers'
import TodoList from '../build/contracts/TodoList.json'

const contract = {
    namespaced: true,
    sate: {
        todoListAbi: null,
        contractAddress: null,
        taskList: [],
        contract: null,
    },
    mutations: {
        setTaskList(state, _tasks) {
            state.taskList = _tasks
        },
        setTodoListAbi(state, abi) {
            state.todoListAbi = abi
        },
        setContract(state, contract) {
            state.contract = contract
        },
    },
    actions: {
        async loadContract({ commit, rootState, state }) {
            debugger
            try {
                const { ethereum } = window
                if (ethereum) {

                    const provider = new ethers.providers.Web3Provider(ethereum, 'any')

                    const signer = provider.getSigner()
                    const contract = new ethers.Contract(state.contractAddress, TodoList.abi, signer)
                    commit('setContract', contract)
                }
            } catch (error) {
                console.error(error)
            }
        },
        async fetchTasks({ commit, rootState, state }) {
            let tasks = await state.contract.getTasksList()
            commit('setTaskList', tasks)
        },
        storeTodoListAbi({ commit }) {
            commit('setTodoListAbi', TodoList.abi)
        },
    },
    getters: {
        getTasks(state) {
            return state.taskList
        },
        getTodoListAbi(state) {
            return state.todoListAbi
        },
        getContractAddress(state) {
            return state.contractAddress
        },
    },
}
export default contract
