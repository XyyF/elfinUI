<template>
    <div class="profile-water-mark">
        <img :src="img">
        <p>{{msg}}</p>
    </div>
</template>

<script>
    const defaultImg = require('./images/default_water_mark.png')

    export default {
        name: 'water-mark',
        props: {
            img: {type: String, default: defaultImg},
            msg: {type: String, default: '没有任何记录哦'},
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../../components/pc/styles/basic_const";

    .profile-water-mark {
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
            color: $text-hint;
            font-size: 14px;
        }
    }
</style>
