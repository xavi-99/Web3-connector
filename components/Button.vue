<template>
<button :class="btnClass" @click="click">
    {{btnText}}
</button>
    
</template>

<script>
export default {
    props:['btnText','btnClass',"click"]
}
</script>

<style>

</style>