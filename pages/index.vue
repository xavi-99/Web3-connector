<template>
    <div>
        <Header></Header>
        <b-button @click="loadContract">Load Contract</b-button>
        <b-button @click="fetchTasks">fetch Tasks</b-button>
    </div>
</template>

<script>
import Header from '../components/Header.vue'
import { mapGetters, mapActions } from 'vuex'
export default {
    components: {
        Header,
    },
    methods: {
        ...mapActions('contract', ['loadContract', 'fetchTasks']),
    },
}
</script>
