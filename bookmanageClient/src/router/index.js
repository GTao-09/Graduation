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
                    redirect: '/infopersonal',
                    component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/index.vue'),
                    children: [
                        {
                            path: '/userconfig',
                            name: 'UserConfig',
                            component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/UserConfig.vue')
                        },
                        {
                            path: '/registered',
                            name: 'Registered',
                            component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/Registered.vue')
                        },
                        {
                            path: '/infopersonal',
                            name: 'InfoPersonal',
                            component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/InfoPersonal.vue')
                        },
                        {
                            path: '/bookinfo',
                            name: 'bookinfo',
                            component: () => import(/* webpackChunkName: "about" */ '../views/PersonalCenter/VCharts/index.vue')
                        }
                    ]
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
