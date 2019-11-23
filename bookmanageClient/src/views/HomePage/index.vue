<template>
    <div class="home-page">
        <SideMenu></SideMenu>
        <div class="home-content">
            <!-- 技术采用 (轮播图) -->
            <div id="technology-adoption">
                <el-carousel :interval="4000" type="card" height="300px">
                    <el-carousel-item v-for="item in 6" :key="item">
                        <h3 class="medium">{{ item }}</h3>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <!-- 最近更新 -->
            <div id="recent-updates">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span style="font-weight: bold;font-size: 20px">最近更新</span>
                    </div>
                    <div class="block">
                        <el-timeline>
                            <!-- 这个将会是一个动态展示，在个人信息中增加(管理员可加), 数据存储数据库以便长久展示 (?具体实现看情况) -->
                            <el-timeline-item timestamp="2019/4/13" placement="top">
                                <el-card>
                                    <h4>实现上传至服务器和输入 URL 两种方式添加封面</h4>
                                    <p>Evan 提交于 2019/4/13 21:32</p>
                                </el-card>
                            </el-timeline-item>
                            <el-timeline-item timestamp="2019/4/11" placement="top">
                                <el-card>
                                    <h4>实现图书分类功能</h4>
                                    <p>Evan 提交于 2019/4/11 09:02</p>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </div>
                </el-card>
            </div>
            <!-- 下载源码 (同原) -->
            <div id="download-source-code">
                <DownCode></DownCode>
            </div>
            <!-- 关于我们 (同原) -->
            <div id="about">
                <About></About>
            </div>
        </div>
    </div>
</template>

<script>
import SideMenu from './SideMenu'
import DownCode from './DownCode'
import About from './About'
export default {
    name: 'HomePage', // 首页
    components: {
        SideMenu,
        DownCode,
        About
    },
    mounted () {
        console.log(this.$store.state)
        // this.$store.commit('TOKEN', '')
    }
}
</script>

<style lang="less" scoped>
.home-content{
    width: 70%;
    margin-left: auto;
    margin-right: auto;
    margin-top: -20px;
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
}
.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}
.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
.box-card {
    margin-top: 5px;
    text-align: left;
}
</style>
