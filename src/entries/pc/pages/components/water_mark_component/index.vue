<template>
    <div class="water-mark-component">
        <water-mark-md></water-mark-md>
    </div>
</template>

<script>
    import waterMarkMd from './water_mark.md'

    export default {
        name: 'water-mark-component',
        components: {
            waterMarkMd,
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .water-mark-component {
    }
</style>
