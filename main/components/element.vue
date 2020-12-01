<template>
  <iframe
    id="ifra"
    name="ifra"
    class="iframe-element"
    :src="src"
  />
</template>

<script>
    export default {
        name: 'ElementComponent',
        props: {
            src: {
                type: String,
                default: '',
            }
        },
    };
</script>

<style lang="scss" scoped>
    .iframe-element {
        display: block;
        box-sizing: content-box;
        height: 100%;
        width: 100%;
        border: 0 none;
        -webkit-transition: all .3s, background-position 0s;
        transition: all .3s, background-position 0s;
        background-position: -1px -1px, -1px -1px, -1px -1px, -1px -1px;
    }
</style>
