<template>
    <div class="wrapper">
        <b-container>
            <b-container fluid>
                <b-row>
                    <b-col>
                        <Button
                            btn-text="Connect To Web3 and say hello from my Smartcontract"
                            btn-class="button--green"
                            :callback="connect"
                        ></Button>
                        <Button btn-text="load Contract" btn-class="button--green" :callback="loadContract"></Button>
                        <Button btn-text="Get getTask List" btn-class="button--green" :callback="getTaskList"></Button>
                        <Button btn-text="Say Hello" btn-class="button--green" :callback="sayHello"></Button>
                        <Button btn-text="Add Task" btn-class="button--green" :callback="addTask"></Button>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '../components/Button.vue'

export default {
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
    },
    computed: {
        ...mapGetters({
            getTitle: 'web3/getTitle',
        }),
    },
    // async mounted() {
    //     await this.$store.dispatch('web3/connect', false)
    // },
    methods: {
        async connect() {
            await this.$store.dispatch('web3/connect', true)
        },
        async loadContract() {
            await this.$store.dispatch('web3/loadContract')
        },
        async getTaskList() {
            await this.$store.dispatch('web3/getTaskList')
        },
        async sayHello() {
            await this.$store.dispatch('web3/sayHello')
        },
        async addTask() {
            await this.$store.dispatch('web3/addTask')
        },
    },
}
</script>
