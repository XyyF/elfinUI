<template>
    <div id="app">
        <router-view class="page-root"></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import VueRouter from 'vue-router';
    import router from './router.js';
    import store from './store';

    Vue.use(VueRouter);

    export default {
        name: 'app',
        data() {
            return {};
        },
        // 通过 router 配置参数注入路由，从而让整个应用都有路由功能
        router,
        store,
    }
</script>

<!-- 全局样式-->
<style lang="scss" src="./styles/basic.scss"></style>
<style src="./styles/iconfont.css"></style>
<style src="./styles/iconfont_all/iconfont.css"></style>

<style>
    #app {
        height: 100%;
        width: 100%;
    }
</style>
