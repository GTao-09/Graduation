<template>
    <div class="side-menu">
        <el-aside>
            <el-menu
                default-active="1"
                style="width: 170px">
                <a href="#technology-adoption">
                    <el-menu-item index="1">
                        <i class="el-icon-menu"></i>
                        <span slot="title">技术采用</span>
                    </el-menu-item>
                </a>
                <a href="#recent-updates">
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">最近更新</span>
                    </el-menu-item>
                </a>
                <a href="#download-source-code">
                    <el-menu-item index="3">
                        <i class="el-icon-document"></i>
                        <span slot="title">下载源码</span>
                    </el-menu-item>
                </a>
                <a href="#about">
                    <el-menu-item index="4">
                        <i class="el-icon-setting"></i>
                        <span slot="title">关于我们</span>
                    </el-menu-item>
                </a>
            </el-menu>
        </el-aside>
    </div>
</template>

<script>
export default {
    name: 'SideMenu' // 侧边导航
}
</script>

<style lang="less" scoped>
a {
    text-decoration: none;
    color: inherit;
}
.side-menu {
    position: fixed;
    // margin-left: 50%;
    // left: -680px;
    top: 100px;
}
.side-menu /deep/ .el-aside {
    overflow: hidden;
}
</style>
