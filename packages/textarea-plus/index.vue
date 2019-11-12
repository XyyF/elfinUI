<template>
    <div class="textarea-plus-root">
        <el-input
            v-model="text"
            v-bind="$attrs"
            type="textarea"
            resize="none"
            class="textarea-target"
            v-on="$listeners">
        </el-input>
        <span class="tip">
            {{ value.length }}/{{ $attrs.maxlength }}
        </span>
    </div>
</template>

<script>

    export default {
        name: 'textarea-plus', // Notice: 写组件的时候需要给一个名字
        directives: {},
        components: {},
        mixins: [],
        data() {
            return {}
        },
        props: {
            value: {
                type: String,
                default: '',
            },
        },
        computed: {
            text: {
                get() {
                    return this.value
                },
                set(value) {
                    this.$emit('input', value)
                },
            },
        },
        filters: {},
        methods: {},
        watch: {},
        beforeCreate() {
        },
        created() {
        },
        beforeMount() {
        },
        mounted() {
        },
        beforeUpdate() {
        },
        updated() {
        },
        activated() {
        },
        deactivated() {
        },
        beforeDestroy() {
        },
        destroyed() {
        },
        errorCaptured() {
        },
    }
</script>

<style lang="scss" scoped>
    .textarea-plus-root {
        position: relative;
    }
    .textarea-target {

        /deep/ textarea {
            background-color: #F4F8F9;
            padding-bottom: 30px;
        }
    }

    .tip {
        position: absolute;
        right: 13px;
        bottom: 8px;
        font-size: 12px;
        font-weight: 500;
        color: #656C70;
        line-height: initial;
    }
</style>