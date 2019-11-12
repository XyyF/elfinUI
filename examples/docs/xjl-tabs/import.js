import xjlTabs from 'packages/xjl-tabs/index.vue'

export default {
    components: {
        xjlTabs
    },
    data() {
        return {
            tabsOptions: [{
                value: '选项一',
                lable:'用户管理用户管理用户管理用户管理',
                content: '我是哒哒哒'
            }, {
                value: '选项二',
                lable:'教室管理',
                content: '我是嘀嘀嘀'
            }],
            placeholder: '我是默认值',
            isShowSearch: true,
            beforeLeave: () => {
                console.log('切换前可以阻止切换')
            }
        }
    }
}