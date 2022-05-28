<template>
    <b-container fluid>
        <b-img class="w-25" center :src="image" fluid></b-img>
        <!-- <h5 class="text-center">{{ tittle }}</h5> -->
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
    name: 'HeaderComponent',
    props: {
        image: {
            type: String,
            default: require('@/assets/img/Metamask.svg'),
        },
    },
    computed: {
        ...mapGetters({
            tittle: 'web3/getTitle',
        }),
    },
}
</script>

<style></style>
