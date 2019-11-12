<template>
    <div>
        <!--按钮文字颜色直接通过style修改-->
        <el-button
            v-for="btn in buttonsConfig"
            class="text-btn"
            :style="{
                color: colorConfig[btn.color] || ''
            }"
            type="text"
            :key="btn.text"
            @click="btn.clickHandler(row)">
            {{btn.text}}
        </el-button>
    </div>
</template>

<script>
    import {colorConfig} from 'utils/color-theme'
    import {Button} from 'meetin-sass-ui'
    import columnMixin from 'components/pc/xjl-table/custom-column-mixin'

    export default {
        name: 'cell-text-btn', // Notice: 写组件的时候需要给一个名字
        directives: {},
        components: {
            [Button.name]: Button,
        },
        mixins: [columnMixin],
        data() {
            return {
                colorConfig,
            }
        },
        props: {
            // 按钮组
            buttons: {
                type: Array,
                default() {
                    return []
                },
            },
        },
        computed: {
            // can override
            buttonsConfig() {
                return this.buttons
            },
        },
        filters: {},
        methods: {
        },
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
    .text-btn + .text-btn {
        margin-left: 20px;
    }
</style>