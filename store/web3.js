import { ethers } from 'ethers'
import TodoListJson from '@/assets/contract/TodoList.json'
const web3 = {
    namespaced: true,
    state: () => ({
        account: null,
        error: null,
        contract_address: '0x507C7E396625ee0DBBF09f42dA235B61B3c0De94',
        contract: null,
        title: 'To do list with Blockchain',
        taskList: [],
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
        setContract(state, contract) {
            state.contract = contract
        },
        setTaskList(state, taskList) {
            state.taskList = taskList
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
                console.log('Connected')
            } catch (error) {
                console.log(error)
                commit('setError', 'Account request refused')
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
        async getTaskList({ commit, state, dispatch }) {
            try {
                if (!state.contract) {
                    await dispatch('loadContract')
                }

                const tasks = await state.contract.getTaskList()
                console.log(tasks)
                commit('setTaskList', tasks)
            } catch (error) {
                console.log(error)
            }
        },
        async addTask({ commit, state, dispatch }) {
            try {
                if (!state.contract) {
                    await dispatch('loadContract')
                }

                // await state.contract.addTask('New task', 0)

                const test = state.contract.addTask('New task', 0).then((res) => console.log(res))
            } catch (error) {
                console.log(error)
            }

            //             .send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
            // .on('transactionHash', function(hash){
            //     ...
            // })
            // .on('confirmation', function(confirmationNumber, receipt){
            //     ...
            // })
            // .on('receipt', function(receipt){
            //     // receipt example
            //     console.log(receipt);
            //     > {
            //         "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
            //         "transactionIndex": 0,
            //         "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
            //         "blockNumber": 3,
            //         "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
            //         "cumulativeGasUsed": 314159,
            //         "gasUsed": 30234,
            //         "events": {
            //             "MyEvent": {
            //                 returnValues: {
            //                     myIndexedParam: 20,
            //                     myOtherIndexedParam: '0x123456789...',
            //                     myNonIndexParam: 'My String'
            //                 },
            //                 raw: {
            //                     data: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            //                     topics: ['0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7', '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385']
            //                 },
            //                 event: 'MyEvent',
            //                 signature: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            //                 logIndex: 0,
            //                 transactionIndex: 0,
            //                 transactionHash: '0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385',
            //                 blockHash: '0xfd43ade1c09fade1c0d57a7af66ab4ead7c2c2eb7b11a91ffdd57a7af66ab4ead7',
            //                 blockNumber: 1234,
            //                 address: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'
            //             },
            //             "MyOtherEvent": {
            //                 ...
            //             },
            //             "MyMultipleEvent":[{...}, {...}] // If there are multiple of the same event, they will be in an array
            //         }
            //     }
            // })
            // .on('error', console.error);
        },
        async sayHello({ commit, state, dispatch }) {
            try {
                if (!state.contract) {
                    await dispatch('loadContract')
                }

                await state.contract.sayHello().then((res) => {
                    console.log(res)
                })
            } catch (error) {
                console.log(error)
            }
        },
        loadContract({ state, commit }) {
            try {
                if (!state.contract) {
                    const { ethereum } = window
                    const provider = new ethers.providers.Web3Provider(ethereum)
                    const signer = provider.getSigner()
                    const contractAbi = TodoListJson.abi
                    const connectedContract = new ethers.Contract(state.contract_address, contractAbi, signer)

                    commit('setContract', connectedContract)
                }
            } catch (error) {
                console.log(error)
                console.log('connected contract not found')
            }
        },
    },
}

export default web3
