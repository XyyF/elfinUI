<template>
    <div class="water-mark-component">
        waterMark 水位标志
        <water-mark></water-mark>
    </div>
</template>

<script>
    import waterMark from './water_mark.vue'

    export default {
        name: 'water-mark-component',
        components: {
            waterMark,
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../components/pc/styles/basic_const";

    .water-mark-component {
    }
</style>
