export default {
    getFormatItemByProp,
    getPropByPath,
}

export function getFormatItemByProp(formatData, prop) {
    return formatData.find(item => item.prop === prop)
}

export function getPropByPath(obj, path, strict) {
    var tempObj = obj
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    var keyArr = path.split('.')
    var i = 0
    for (var len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break
        var key = keyArr[i]
        if (key in tempObj) {
            tempObj = tempObj[key]
        }
        else {
            if (strict) {
                throw new Error('please transfer a valid prop path to form item!')
            }
            break
        }
    }
    return {
        o: tempObj,
        k: keyArr[i],
        v: tempObj ? tempObj[keyArr[i]] : null,
    }
}