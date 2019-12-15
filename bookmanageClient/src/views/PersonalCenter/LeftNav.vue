<template>
    <div class="admin-left-nav">
        <el-aside class="sider">
            <!-- :default-active="$route.path"  -->
            <el-menu class="menu" :router="true" default-active="/infopersonal" @select="select"
                background-color="#545c64"
                text-color="#ffffff"
                active-text-color="#ffd04b">
                <template>
                    <el-submenu v-for="item in leftNavArr" :key="item.name" :index="item.name" >
                        <template slot="title">
                            <i :class="item.icon"></i>
                            <span>{{ item.name }}</span>
                        </template>
                        <el-menu-item v-for="citem in item.children"
                            :key="citem.name"
                            :index="citem.path">
                            <span slot="title">{{ citem.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                </template>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
export default {
    name: 'AdminLeftNav', // 个人中心侧导航
    mounted () {
        if (this.$store.state.token && Object.keys(this.$store.state.token).length) {
            this.identify = this.$store.state.token.identify
            console.log(this.identify)
            if (this.identify === '1') {
                this.leftNavArr.push(
                    {
                        icon: 'el-icon-menu',
                        name: '用户管理', // 只有管理员才展示
                        children: [
                            { path: '/userconfig', name: '用户配置' }, // 用户信息的修改
                            { path: '/registered', name: '注册' }
                        ]
                    }
                )
            }
        }
    },
    data () {
        return {
            identify: '0',
            leftNavArr: [
                // {
                //     icon: 'el-icon-menu',
                //     name: '用户管理', // 只有管理员才展示  记得注释掉
                //     children: [
                //         { path: '/userconfig', name: '用户配置' }, // 用户信息的修改
                //         { path: '/registered', name: '注册' }
                //     ]
                // },
                {
                    icon: 'el-icon-menu',
                    name: '信息管理',
                    children: [
                        { path: '/infopersonal', name: '个人信息' },
                        { path: '/bookinfo', name: '书库信息' } // 数据可视化
                    ]
                }
            ]
        }
    },
    methods: {
        select (index) {
            console.log(index)
            this.$emit('select', index) // TODO: 重复点击刷新
        }
    }
}
</script>

<style lang="less" scoped>
.admin-left-nav {
    background-color: #545c64;
    width: 200px;
    min-height: 565px;
}
// .el-menu-item, .el-submenu {
//     span {
//         color: #666;
//     }
// }
// .el-submenu .el-menu .el-menu-item {
//     color: #666;
// }
.sider {
    width: 200px !important;
    // width: 201px !important;
    // background-color: #ffffff;
    .menu {
        height: 100%;
        .icon {
            font-size: 16px;
        }
    }
}
.menu /deep/ .el-submenu__icon-arrow {
    color: #ffffff;
}
// // 修改侧边导航的默认样式
.menu:not(.el-menu--collapse) {
    width: 200px;
}
// .menu /deep/ .el-submenu__title {
//     background-color: #ffffff;
//     height: 42px;
//     line-height: 42px;
// }
// .menu /deep/ .el-menu-item {
//     height: 39px;
//     line-height: 39px;
// }
// .menu  /deep/ .el-submenu .is-active {
//     i {
//         color: #409EFF;
//     }
//     background-color: #f2f6f9;
// }
// .menu  /deep/ .is-active {
//     background-color: #f2f6f9;
// }
.admin-left-nav /deep/ .el-aside {
    overflow: hidden;
}
</style>
