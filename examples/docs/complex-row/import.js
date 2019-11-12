import ComplexRow from '@elfinUI/complex-row/index'
import ItemType from '@elfinUI/complex-row/item-type'

export default {
    components: {
        ComplexRow,
    },
    data() {
        return {
            buttonsConfig: [
                {
                    type: ItemType.BUTTON,
                    label: 'button',
                },
            ],
        }
    },
}