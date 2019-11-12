<template>
    <high-filter v-model="filter" :visible="visible">
        <filter-group title="时间字段">
            <filter-item
                v-for="field in timeFields"
                :key="field.prop"
                v-bind="field">
            </filter-item>
        </filter-group>
        <filter-group title="自定义字段"></filter-group>
    </high-filter>
</template>

<script>
    export default {
        name: 'demo',
        data() {
            return {
                filter: {
                    time: '',
                    name: '',
                    address: '',
                },
                visible: false,
                timeFields: [
                    {
                        label: String,
                        prop: String,
                        render: 'el-input', // function || string || CNode
                        renderOptions: {

                        },
                        toDisplay(val) {
                            // return xxx(options, val)
                            return val
                        }
                    }
                ]
            }
        },
        methods: {
            handleReset() {

            }
        }
    }
</script>

<style scoped>

</style>