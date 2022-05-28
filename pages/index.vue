<template>
    <div class="wrapper">
        <HeaderComponent></HeaderComponent>
        <b-container>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <Button
                            btn-text="Connect To Web3 and say hello from my Smartcontract"
                            btn-class="button--green"
                            :callback="initWeb3"
                        ></Button>
                    </b-col>
                </b-row>

                <b-row>
                    <JsonPrintter :content="getTodoListResponse"> </JsonPrintter>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import Web3 from 'web3'
import Contract from 'web3-eth-contract'

import { mapGetters, mapMutations } from 'vuex'
import Button from '../components/Button.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import JsonPrintter from '../components/JsonPrintter.vue'
import TodoList from '../build/contracts/TodoList.json'

export default {
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        JsonPrintter,
        HeaderComponent,
    },
    computed: {
        ...mapGetters({
            getTodoListResponse: 'web3/getTodoListResponse',
            getTitle: 'web3/getTitle',
        }),
        web3() {
            return this.getInstance
        },
    },
    methods: {
        ...mapMutations({
            setInstance: 'web3/setInstance',
            setTodoListResponse: 'web3/setTodoListResponse',
        }),
        async initWeb3() {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    // Ask for connection
                    await window.ethereum.request({
                        method: 'eth_requestAccounts',
                    })
                    // Get node info
                    const web3 = new Web3(window.ethereum)
                    let contract = new web3.eth.Contract(TodoList.abi, '0xEE3b2D9c0028eE045114dbD935Fe0F054aE060b8')
                    contract.methods
                        .sayHello()
                        .call()
                        .then((response) => {

                            this.setTodoListResponse(response)
                        })
                } catch (error) {
                    console.error(error)
                }
            }
        },
    },
}
</script>
