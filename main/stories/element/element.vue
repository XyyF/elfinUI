<template>
    <iframe id="ifra" name="ifra" class="iframe-element" :src="src"></iframe>
</template>

<script>
    export default {
        name: 'HelloWorld',
        props: {
            src: {
                type: String,
                default: '',
            }
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
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
