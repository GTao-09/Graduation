
// 定义存取localStorage的方法
const saveToLocal = (storageType, id, key, value) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let graduationStore = store.__graduationStore__
    if (!graduationStore) {
        graduationStore = {}
        graduationStore[id] = {}
        graduationStore[id][key] = value
    } else {
        graduationStore = JSON.parse(graduationStore)
        if (!graduationStore[id]) {
            graduationStore[id] = {}
        }
    }
    graduationStore[id][key] = value
    store.__graduationStore__ = JSON.stringify(graduationStore)
}
// def 为默认数据
const getFromLocal = (storageType, id, key, def) => {
    let store = storageType === 'localStorage' ? window.localStorage : window.sessionStorage
    let graduationStore = store.__graduationStore__
    if (!graduationStore) {
        return def
    }
    graduationStore = JSON.parse(graduationStore)[id]
    if (!graduationStore) {
        return def
    }
    if (graduationStore[key] === 'undefined') {
        return def
    }
    return graduationStore[key] || def
}

export {
    saveToLocal,
    getFromLocal
}
