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
                            <template v-for="(item, index) in timelineArr">
                                <el-timeline-item :timestamp="item.date" placement="top" :key="index">
                                    <el-card>
                                        <h4>{{ item.describe }}</h4>
                                        <p>{{ item.submitDesc }}</p>
                                    </el-card>
                                </el-timeline-item>
                            </template>
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
    data () {
        return {
            timelineArr: [
                {
                    date: '2019/12/08',
                    describe: '图片上传功能完成',
                    submitDesc: 'Gong 提交于 2019/12/08 17:20'
                },
                {
                    date: '2019/12/01',
                    describe: '图书分页功能完',
                    submitDesc: 'Gong 提交于 2019/12/01 17:16'
                },
                {
                    date: '2019/12/01',
                    describe: '开始初步前后端联调，使前后端能连通，主要解决问题跨域',
                    submitDesc: 'Gong 提交于 2019/12/01 12:00'
                },
                {
                    date: '2019/12/01',
                    describe: '实现图书分类功能',
                    submitDesc: 'Gong 提交于 2019/12/01 09:02'
                },
                {
                    date: '2019/11/21',
                    describe: '项目框架构建',
                    submitDesc: 'Gong 提交于 2019/11/21 21:32'
                }
            ]
        }
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
