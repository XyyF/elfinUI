import Vue from 'vue'
import Dialog from 'packages/dialog-controller/index.js'

import TestComponent1 from './test-component1'
import TestComponent2 from './test-component2'

Vue.use(Dialog, {
    width: '600px'
})

export default {
    methods: {
        show1() {
            this.$dialog
                .config({
                    props: {
                        width: '450px',
                        title: '新建弹窗'
                    }
                })
                .show(TestComponent1, {
                    props: {
                        dialogData: '外部传入弹窗内部的自定义参数'
                    }
                })
                .onClose((params) => {
                    this.$message(`component1关闭回调，参数：${params}`)
                })
        },
        show2() {
            this.$dialog
                .show(TestComponent2, {
                    props: {
                        dialogData: '外部传入弹窗内部的自定义参数'
                    }
                })
                .onClose((params) => {
                    this.$message(`component2关闭回调，参数：${params}`)
                })
        }
    }
}