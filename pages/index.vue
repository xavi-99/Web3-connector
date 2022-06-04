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
                            :callback="connect"
                        ></Button>
                    </b-col>
                </b-row>
            </b-container>
        </b-container>
        <TodoList></TodoList>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Button from '../components/Button.vue'
import TodoList from '../components/TodoList.vue'
import HeaderComponent from '../components/HeaderComponent.vue'
import JsonPrintter from '../components/JsonPrintter.vue'

export default {
    components: {
        // eslint-disable-next-line vue/no-reserved-component-names
        Button,
        JsonPrintter,
        HeaderComponent,
        TodoList,
    },
    computed: {
        ...mapGetters({
            getTitle: 'web3/getTitle',
        }),
    },
    async mounted() {
        await this.$store.dispatch('web3/connect', false)
    },
    methods: {
        async connect() {
            await this.$store.dispatch('web3/connect', true)
            // await this.$store.dispatch('todolist/setContract')
        },
    },
}
</script>
