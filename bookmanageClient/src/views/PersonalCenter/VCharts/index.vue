<template>
    <div class="test-charts">
        <div class="header">
            <div class="bg-header">
                <div class="header-title">书库数据可视化</div>
            </div>
        </div>
        <div class="charts-main">
            <div class="main-left">
                <div class="left-box">
                    <charts>
                        <div class="pie-warp">
                            <div class="pie-title">(类型所占比例)</div>
                            <ve-pie :extend="chartExtend" :data="chartData" :settings="chartSettings"></ve-pie>
                        </div>
                    </charts>
                </div>
            </div>
            <div class="main-center">
                <div class="center-title">每月引进与毁坏的书籍数目</div>
                <!-- 柱状图 -->
                <div class="histogram-style">
                    <ve-histogram :extend="histogramChartExtend" :data="histogramChartData" :settings="histogramChartSettings"></ve-histogram>
                </div>
            </div>
            <div class="main-right">
                <div class="right-box">
                    <charts>
                        <div class="carousel-warp">
                            <!-- <advertising></advertising> -->
                        </div>
                    </charts>
                </div>
            </div>
        </div>
        <!-- <charts>
            <div>test</div>
        </charts> -->
    </div>
</template>

<script>
import charts from './charts'
// import advertising from './advertising'
export default {
    name: 'testCharts', // v-charts测试
    components: {
        charts
        // advertising
    },
    data () {
        this.histogramChartSettings = {
            metrics: ['引进书籍数目', '毁坏书籍数目'],
            dimension: ['日期']
        }
        this.chartSettings = {
            radius: 60
        }
        this.chartExtend = {
            series: {
                // color: 'rgb(126, 203, 224)', // 柱子背景颜色
                label: {
                    // show: true,
                    // position: 'top',
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            xAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#fff' // x轴字体颜色
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#fff' // y轴字体颜色
                    }
                }
            },
            legend: {
                textStyle: {
                    color: '#fff' // 图例字体颜色
                }
            }
        }
        this.histogramChartExtend = {
            series: {
                label: {
                    textStyle: {
                        color: '#fff'
                    }
                }
            },
            xAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#fff' // x轴字体颜色
                    }
                }
            },
            yAxis: {
                axisLabel: {
                    textStyle: {
                        color: '#fff' // y轴字体颜色
                    }
                }
            },
            legend: {
                textStyle: {
                    color: '#fff' // 图例字体颜色
                }
            }
        }
        return {
            chartData: {
                columns: ['类型', '所有用数目'],
                rows: [
                    { '类型': '文学', '所有用数目': 1 },
                    { '类型': '流行', '所有用数目': 2 },
                    { '类型': '文化', '所有用数目': 3 },
                    { '类型': '生活', '所有用数目': 1 },
                    { '类型': '经管', '所有用数目': 2 },
                    { '类型': '科技', '所有用数目': 3 }
                    // { '类型': '文学', '所有用数目': 1393 },
                    // { '类型': '流行', '所有用数目': 3530 },
                    // { '类型': '文化', '所有用数目': 2923 },
                    // { '类型': '生活', '所有用数目': 1723 },
                    // { '类型': '经管', '所有用数目': 3792 },
                    // { '类型': '科技', '所有用数目': 4593 }
                ]
            },
            histogramChartData: {
                columns: ['日期', '引进书籍数目', '毁坏书籍数目'],
                rows: [
                    { '日期': '1月', '引进书籍数目': 1393, '毁坏书籍数目': 1093 },
                    { '日期': '2月', '引进书籍数目': 3530, '毁坏书籍数目': 3230 },
                    { '日期': '3月', '引进书籍数目': 2923, '毁坏书籍数目': 2623 },
                    { '日期': '4月', '引进书籍数目': 1723, '毁坏书籍数目': 1423 },
                    { '日期': '5月', '引进书籍数目': 3792, '毁坏书籍数目': 3492 },
                    { '日期': '6月', '引进书籍数目': 4593, '毁坏书籍数目': 4293 }
                ]
            }
        }
    }
}
</script>

<style lang="less" scoped>
.test-charts {
    background: url("../../../assets/charts-bg.png") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    overflow: hidden;
    // position: fixed;
    // left: 0;
    // top: 0;
}
.header {
    width: 100%;
    height: 80px;
    padding: 0 20px;
}
.bg-header {
    width: 100%;
    height: 80px;
    background: url("../../../assets/charts-title.png") no-repeat;
    background-size: 100% 100%;
}
.header-title {
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 2em;
    line-height: 80px;
    color: #fff;
}
.charts-main {
    // width: 100%;
    // width: calc(100% - 40px);
    margin-top: 100px;
    margin-left: 50px;
    margin-right: 50px;
    display: flex;
    .main-left {
        width: 24%;
        height: 600px;
        .left-box {
            min-width: 237px;
            // width: 100%;
        }
    }
    .main-center {
        flex: 1;
        width: 52%;
        padding: 0 30px 0 30px;
    }
    .main-right {
        width: 24%;
        height: 600px;
    }
}
.pie-title {
    width: 100%;
    height: 40px;
    color: #61d2f7;
    padding: 10px 0;
    font-weight: bold;
    font-size: 1.7rem;
    text-align: center;
    // margin-top: 10px;
    z-index: 1000;
}

.carousel-warp {
    height: 200px;
    padding: 10px;
}
.center-title {
    width: 100%;
    height: 110px;
    background-color: rgba(35, 72, 135, 0.4);
    margin-bottom: 15px;
    font-size: 35px;
    line-height: 110px;
    color: #fff;
}
</style>
