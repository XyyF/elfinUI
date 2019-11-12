import sidePopup from 'packages/side-popup/index.js'
import Vue from 'vue'
import TestComponent1 from './test-component1'
import TestComponent2 from './test-component2'

Vue.use(sidePopup,{})
export default {

    data() {
        return {

        }
    },
    methods: {
        show() {
            this.$sidePopup.config({
                    position: 'top'
            }).show(TestComponent1, {
                props: {
                    sidePopupData: '外部传入弹窗内部的自定义参数',
                }
            }).onClose((params) => {
                this.$message(`component1关闭回调，参数：${params}`)
            })
        } ,
        show2() {
            this.$sidePopup.config({
                        position:'left'
                })
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