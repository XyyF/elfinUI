<template>
    <div class="page-404">
        <div class="content">
            <p>哇塞，您找到了一个不存在的页面</p>
        </div>
    </div>
</template>

<script type="text/babel">
    export default {
        name: 'page-404',
        data() {
        },
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import "../../../components/pc/styles/basic_const";

    .page-404 {
        width: 100%;
        height: 100%;
        background: url(../images/404_bg.jpg) center;
        background-size: cover;
        .content {
            position: fixed;
            top: 50%;
            margin-top: -20px;
            width: 100%;
            font-size: 16px;
            text-align: center;
        }
        p {
            margin: 0 auto 30px;
            color: #fff;
        }
        a {
            padding: 8px 30px;
            border: 1px solid $line-border;
            border-radius: 20px;
            color: #fff;
            text-decoration: none;
            display: inline-block;
        }
    }
</style>
