<template>
    <div class="page-workbench">
        123131
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
        .main-content {
            background: $dlg-background;
            min-height: 100%;
            width: 100%;
        }
        .white-card {
            background: #fff;
            border-radius: 2px;
            margin-top: 16px;
        }
        .workbench-main {
            margin: 0;
            &.hide {
                padding: 0 !important;
            }
            padding: 30px 28px 24px;
        }
    }
</style>
