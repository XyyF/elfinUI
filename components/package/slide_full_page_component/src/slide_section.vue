<template>
    <div class="slide-section-root transition">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'slide-section',
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../common/pc/basic_const";

    .slide-section-root {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        -webkit-overflow-scrolling: touch;
        -webkit-tap-highlight-color:rgba(255,255,255,0);
        -webkit-text-size-adjust: none;
        -webkit-backface-visibility:hidden;-webkit-transform-style:preserve-3d;
        background-position: center;
        transform: translate3d(0,100%,0);
        -webkit-transform: translate3d(0,100%,0);
        background-color: green;
    }

    .transition {
        transition: all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990);
        -webkit-transition: all 700ms cubic-bezier(0.550, 0.085, 0.000, 0.990);
    }
</style>
