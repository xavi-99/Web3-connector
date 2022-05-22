<template>
  <div>
    <button :class="btnClass" @click="callback">{{ btnText }}</button>
  </div>
</template>

<script>
export default {
  props: ['btnText', 'btnClass', 'callback'],
};
</script>

<style></style>

