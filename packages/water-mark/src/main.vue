<template>
    <div class="water-mark-component-root">
        <img :src="img"/>
        <p>{{ msg }}</p>
    </div>
</template>

<script>
    const defaultImg = require('./images/default_water_mark.png')

    export default {
        name: 'water-mark-component',
        props: {
            img: {type: String, default: defaultImg},
            msg: {type: String, default: '没有任何记录哦'},
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .water-mark-component-root {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        p {
            margin-top: 10px;
            color: #b4c1cc;
            font-size: 14px;
        }
    }
</style>
