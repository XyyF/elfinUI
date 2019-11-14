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
                    type: ItemType.BUTTON,
                    itemOptions: {
                        props: {
                            type: 'primary',
                        },
                        scopedSlots: {
                            default: (h) => h('span', '按钮'),
                        },
                    },
                },
            ],
        }
    },
}