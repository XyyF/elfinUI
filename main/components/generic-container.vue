<template>
    <div class="generic-container-root">
        <!-- Block-Element--Modifier-->
        <h3 v-if="title">{{ title }}</h3>
        <div v-if="subDocs || $slots.subDocs" class="sub_docs">
            <slot name="subDocs">
                {{ subDocs }}
            </slot>
        </div>
        <div v-if="$slots.default" class="demo">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'generic-container',
        directives: {},
        components: {},
        mixins: [],
        data() {
            /* Notice: 给data里面的变量留下说明文字 */
            return {}
        },
        props: {
            /* Notice: 写下props数据的描述、用途 */
            /* Notice: props 里面的定义，使用此结构，type、default */
            title: {
                type: String,
                default: '',
            },
            subDocs: {
                type: String,
                default: '',
            },
        },
    }
</script>

<style lang="scss" rel='stylesheet/scss' scoped>
    h3 {
        cursor: text;
        position: relative;
        color: rgb(51, 51, 51);
        font-size: 20px;
        margin: 0 0 8px;
        padding: 0;
    }

    .sub_docs {
        font-size: 14px;
        line-height: 24px;
        color: rgb(51, 51, 51);
        margin: 16px 0;
    }

    .demo {
        position: relative;
        box-shadow: rgba(0, 0, 0, 0.1) 0 1px 3px 0;
        margin: 25px 0 40px;
        border-radius: 4px;
        background: rgb(255, 255, 255);
        border: 1px solid rgba(0, 0, 0, 0.1);
        padding: 10px 20px;
    }
</style>