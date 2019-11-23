import Vue from 'vue'
import Vuex from 'vuex'
import { saveToLocal, getFromLocal } from '../util/storage'
Vue.use(Vuex)
/**
 * persistence 是否持久化 localStorage
 */
let initData = {
    token: { // 用户请求认证，Authorization携带
        persistence: true,
        default: ''
    }
}

let state = {
}
let mutations = {
}

for (let key in initData) {
    let upcaseKey = key.toUpperCase()
    if (initData[key].persistence) {
        // Todo 处理初始化 string -> json 解析
        state[key] = getFromLocal('localStorage', 'graduationStore', key, initData[key].default)
        // Todo  mutations 添加 设置state 方法
        mutations[upcaseKey] = (storeState, obj) => {
        // 设置 localStorage
            saveToLocal('localStorage', 'graduationStore', key, obj)
            storeState[key] = obj
        }
    } else {
        state[key] = initData[key].default
        state[key] = getFromLocal('localStorage', 'graduationStore', key, initData[key].default)
        mutations[upcaseKey] = (storeState, obj) => {
            storeState[key] = obj
        }
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store
