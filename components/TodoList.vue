<template>
    <b-container>
        <b-button @click="setContract">Get Contract</b-button>
        <b-button @click="getTasks">Get Tasks</b-button>
    </b-container>
</template>

<script>
export default {
    name: 'TodoList',
    methods: {
        setContract() {
            this.$store.dispatch('todolist/setContract')
        },
        getTasks() {
            this.$store.dispatch('todolist/getTasks')
        },
    },
}
</script>

<style></style>
