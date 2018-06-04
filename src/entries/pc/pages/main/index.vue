<template>
    <div class="page-index">
        <top-menu></top-menu>
        <router-view class="page-index-router"></router-view>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import TopMenu from './top_menu.vue'

    @Component({
        name: 'xiaojing0-main',
        components: { TopMenu }
    })
    export default class Main extends Vue {
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../common/pc/basic_const";

    .page-index {
        height: 100%;
        width: 100%;
        background: white;
        display: flex;
        flex-flow: row nowrap;
        .page-index-router {
            margin-top: $topMenuHeight;
            width: 100%;
        }
    }
</style>
