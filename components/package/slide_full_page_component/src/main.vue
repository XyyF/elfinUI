<template>
    <div class="slide-full-page-root">
        <slot></slot>
    </div>
</template>

<script>
    import SlideFullPage from 'slidefullpage'

    export default {
        name: 'slide-container',
        data() {
            return {
                slide: {}
            }
        },
        mounted() {
            this.slide = new SlideFullPage({
                containerEl: document.querySelector('.slide-full-page-root'),
                sectionEl: document.querySelectorAll('.slide-section-root')
            })
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../common/pc/basic_const";

    .slide-full-page-root {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>
