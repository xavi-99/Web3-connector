<template>
    <b-button :class="btnClass" variant="outline-dark" @click="callback">{{ btnText }}</b-button>
</template>

<script>
export default {
    name: 'Button',
    props: ['btnText', 'btnClass', 'callback'],
}
</script>

<style></style>
