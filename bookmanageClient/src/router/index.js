import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    name: 'Index',
                    component: () => import(/* webpackChunkName: "about" */ '../views/HomePage/index.vue')
                },
                {
                    path: '/log',
                    name: 'Log',
                    component: () => import(/* webpackChunkName: "about" */ '../views/LogPage/index.vue')
                },
                {
                    path: '/library',
                    name: 'Library',
                    component: () => import(/* webpackChunkName: "about" */ '../views/LibraryPage/index.vue')
                },
                {
                    path: '/admin',
                    name: 'Admin',
                    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/index.vue')
                }
            ]
        },
        {
            path: '/404',
            name: 'NoPage',
            component: () => import(/* webpackChunkName: "about" */ '../views/404.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
        },
        { path: '*', redirect: '/404' }
    ]
})
