/**
 * Created by gukong on 2016/12/10.
 */
export default {
    data() {
        return {}
    },
    props: {
        // 当前行的序号
        rowIndex: {
            type: Number,
            default: 0,
        },
        // 当前行的数据
        row: {
            type: Object,
            default: () => {
                return {}
            },
        },
        // 当前列的列名
        prop: {
            type: String,
            default: '',
        },
    },
    computed: {
        // 当前单元格要显示的数据
        cellData() {
            return this.row[this.prop]
        },
    },
    methods: {},
}
