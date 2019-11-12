<template>
    <div class="dialog-loading">
        <i class="el-icon-loading"></i>
    </div>
</template>

<script>
    export default {
        name: 'loading',
    }
</script>

<style scoped>
    .dialog-loading {
        width: 100%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .el-icon-loading {
        font-size: 60px;
        color: #999;
    }
</style>