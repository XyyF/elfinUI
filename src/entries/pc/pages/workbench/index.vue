<template>
    <div class="page-workbench">
        <div class="page-workbench-wrap">
        xiaojing0UI
        <a href="http://xiaojing0.com/#/">官网</a>
        成员：Nate、Butters、Rengar
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue'
    import Component from 'vue-class-component'
    import { Input } from 'meetin-sass-ui'

    @Component({
        name: 'workbench-page',
        components: {
            [Input.name]: Input,
        }
    })
    export default class Workbench extends Vue {
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../../common/pc/basic_const";

    .page-workbench {
        height: 100%;
        &-wrap {
            width: $mainContentWidth;
            margin: 0 auto;
            padding-top: $topMenuHeight;
        }
    }
</style>
