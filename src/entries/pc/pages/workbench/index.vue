<template>
    <div class="page-workbench">
        <div class="page-workbench-wrap">
        xiaojing0UI
        <a href="http://xiaojing0.com/#/">官网</a>
        成员：Nate、Butters、Rengar
        </div>
    </div>
</template>

<script>
    export default {
        name: 'workbench-page',
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../../components/pc/styles/basic_const";

    .page-workbench {
        height: 100%;
        &-wrap {
            width: $mainContentWidth;
            margin: 0 auto;
            padding-top: $topMenuHeight;
        }
    }
</style>
