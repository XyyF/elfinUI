<template>
    <div class="calendar">
        calendar 日历
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
    @import "../../../common/basic_const";

    .calendar {
    }
</style>
