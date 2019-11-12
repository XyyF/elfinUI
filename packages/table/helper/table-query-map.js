// 矫正Number类型的数据
const correctNumber = (val) => {
    return parseInt(val, 10)
}

export default {
    // 是否禁用
    isEnabled: {
        type: 'Number',
        correctFun: correctNumber,
    },
    // 是否禁用
    campusState: {
        type: 'Number',
        correctFun: correctNumber,
    },
}