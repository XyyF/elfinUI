/**
 * Created by rengar on 2020/8/29.
 */

/**
 * 获取prop路径
 * @param obj 对象数据
 * @param path 路径
 */
export function getPropByPath(obj, path, strict) {
    let tempObj = obj
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')

    let keyArr = path.split('.')
    let i = 0
    for (let len = keyArr.length; i < len - 1; ++i) {
        if (!tempObj && !strict) break
        var key = keyArr[i]
        if (key in tempObj) {
            tempObj = tempObj[key]
        } else {
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