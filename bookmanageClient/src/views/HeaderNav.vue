<template>
    <div class="header-nav">
        <el-menu
            :default-active="this.$route.path"
            :router="true"
            mode="horizontal"
            @select="handleSelect"
            background-color="#fff"
            text-color="#222"
            active-text-color="red"
            style="display: flex;">
            <el-menu-item v-for="(item,index) in navList" :key="index" :index="item.name">
                {{ item.navItem }}
            </el-menu-item>
            <span class="main-title-style">XXX图书管理系统</span>
            <i class="el-icon-switch-button logout-style" @click="logout"></i>
        </el-menu>
    </div>
</template>

<script>
export default {
    name: 'HeaderNav', // 头部导航
    data () {
        return {
            navList: [
                { name: '/index', navItem: '首页' }, // 稍作修改
                { name: '/log', navItem: '日志' }, // 同原
                { name: '/library', navItem: '图书馆' }, // 同原
                { name: '/admin', navItem: '个人中心' } // 1. 个人信息展示 2. 最近更新内容的添加(首页展示)
            ]
        }
    },
    methods: {
        logout () {
            console.log(123)
        },
        handleSelect (key, val) {
            console.log(key, val)
        }
    }
}
</script>

<style lang="less" scoped>
.header-nav {
    min-width: 600px;
    margin-bottom: 40px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.05);
}
a {
    text-decoration: none;
}
span {
    pointer-events: none;
}
.el-icon-switch-button {
    cursor: pointer;
    /*去除点击时的框线*/
    outline:0;
}
.logout-style {
    float:right;
    font-size: 40px;
    color: #222;
    padding: 10px
}
.main-title-style {
    flex: 1;
    padding-top: 15px;
    font-size: 20px;
    font-weight: bold;
    margin-left: -200px;
}
</style>
