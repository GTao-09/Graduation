import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { Message } from 'element-ui'
import VCharts from 'v-charts'
import ajax from './util/ajax'

import './plugins/element.js'
// import './assets/reset.css'

Vue.config.productionTip = false
Vue.prototype.$message = Message
Vue.prototype.$ajax = ajax

Vue.use(VCharts)

// 简单配置
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
    NProgress.start()
    next()
})

router.afterEach(() => {
    NProgress.done()
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
