
/**
 * 支持立即执行的防抖函数
 * @param {function} fn         回调函数
 * @param {number} time         时间间隔
 * @param {boolean} immediate   是否为立即执行的防抖函数，true表示是
 * @return {function}           返回用户调用函数
 */
export const debounces = (fn, time = 500, immediate = true) => {
    let timeout, context, args
    const later = () => setTimeout(() => {
        timeout = null
        if (!immediate) {
            fn.apply(context, args)
            context = args = null
        }
    }, time)

    return function (...params) {
        if (!timeout) {
            timeout = later()
            if (immediate) {
                fn.apply(this, params)
            } else {
                context = this
                args = params
            }
        } else {
            clearTimeout(timeout)
            args = params
            timeout = later()
        }
    }
}

/**
 * 将数组根据id 和 pid转换为树形结构
 * @param {array} list  需要转换的数组
 * @param {string} id id名称
 * @param {string} pid 父id名称
 * @param {any} rootId 根元素的id
 * @returns {array} 转换后的结果
 */
export const transformTree = (list = [], id = 'id', pid = 'pid', rootId = 0) => {
    let obj = {}
    list.forEach(item => {
        obj[item[id]] = item
    })
    list.forEach(item => {
        if (item[pid] !== rootId) {
            obj[item[pid]].children
                ? obj[item[pid]].children.push(item)
                : obj[item[pid]].children = [item]
        }
    })
    let result = list.filter(item => (item[pid] === 0))
    return result
}

/**
 * 格式化日期
 * @param {any} date 可以被new Date识别
 * @param {String} format 日期转换规则 支持：yyyy-MM-dd hh:mm:ss
 * @returns {String} 根据规则格式化后的日期
 */
export const dateFormat = function (date = new Date(), format = 'yyyy-MM-dd') {
    const _date = new Date(date)
    const times = {
        'y+': _date.getFullYear(),
        'M+': _date.getMonth() + 1,
        'd+': _date.getDate(),
        'h+': _date.getHours(),
        'm+': _date.getMinutes(),
        's+': _date.getSeconds()
    }
    for (let k in times) {
        const reg = new RegExp(`(${k})`)
        if (reg.test(format)) {
            const str = times[k] + ''
            format = format.replace(reg, str.length === 1 ? `0${str}` : str)
        }
    }
    return format
}
