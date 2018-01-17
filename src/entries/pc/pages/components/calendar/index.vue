<template>
    <div class="calendar">
        calendar
        <el-button>123</el-button>
    </div>
</template>

<script>
    import {Button} from 'meetin-sass-ui'

    export default {
        name: 'calendar',
        components: {
            [Button.name]: Button
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import "../../../../../components/pc/styles/basic_const";

    .calendar {
    }
</style>
