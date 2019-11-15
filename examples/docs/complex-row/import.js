import ComplexRow from '@elfinUI/complex-row/index'
import ItemType from '@elfinUI/complex-row/item-type'

export default {
    components: {
        ComplexRow,
    },
    data() {
        return {
            buttonConfigs: [
                {
                    label: 'label信息:',
                    type: ItemType.BUTTON,
                    itemOptions: {
                        props: {
                            type: 'primary',
                        },
                        on: {
                            click: this.handleClickBtn.bind(this),
                        },
                        scopedSlots: {
                            default: (h) => h('span', '按钮'),
                        },
                    },
                },
                {
                    type: ItemType.BUTTON,
                    itemOptions: {
                        props: {
                            type: 'text',
                        },
                        scopedSlots: {
                            default: () => '文本按钮',
                        },
                    },
                },
            ],
        }
    },
    methods: {
        handleClickBtn() {
            this.$message.success('触发click')
        },
    },
}