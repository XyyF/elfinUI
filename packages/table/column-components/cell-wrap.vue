<template>
    <p>
        {{ cellData }}
    </p>
</template>

<script>
    import columnMixin from '../custom-column-mixin'

    export default {
        name: 'cell-wrap',
        mixins: [columnMixin],
    }
</script>

<style scoped>
    p {
        white-space: pre-line;
    }
</style>