<template>
    <div class="echarts">
        <div ref="priceQuotation" style="width: 500px; height: 400px;"></div>
    </div>
</template>

<script>
import echarts from 'echarts'
// https://www.echartsjs.com/zh/option.html#title
export default {
    name: 'Echarts', // 数据可视化插件
    created () {
        // 先获取接口的价格数据
        // this.getPrice()
        this.timerInterval = setInterval(() => {
            console.log(123)
        }, 360000)
    },
    mounted () {
        // 绘制曲线图
        this.drawDataTable1()
    },
    data () {
        return {
            timerInterval: '',
            highPriceList: [120, 132, 300], // 数据
            lowerPriceList: [50, 80, 200] // 数据
        }
    },
    methods: {
        drawDataTable1 () {
            console.log('echarts')
            // 初始化echarts实例
            let myChart1 = echarts.init(this.$refs.priceQuotation)
            // 绘制图表
            myChart1.setOption({
                title: { text: '' },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    x: 'center',
                    data: ['某主食手机', '某水果手机']
                },
                radar: [
                    {
                        indicator: [
                            { text: '外观', max: 100 },
                            { text: '拍照', max: 100 },
                            { text: '系统', max: 100 },
                            { text: '性能', max: 100 },
                            { text: '屏幕', max: 100 }
                        ],
                        radius: 80,
                        center: ['50%', '60%']
                    }
                ],
                series: [
                    {
                        type: 'radar',
                        tooltip: {
                            trigger: 'item'
                        },
                        // radarIndex: 1,
                        itemStyle: { normal: { areaStyle: { type: 'default' } } },
                        // itemStyle: {
                        //     normal: {
                        //         areaStyle: {
                        //             opacity: 1
                        //         }
                        //     }
                        // },
                        data: [
                            {
                                value: [85, 90, 90, 95, 95],
                                name: '某主食手机',
                                itemStyle: {
                                    normal: {
                                        color: 'rgba(60,135,213,.3)',
                                        lineStyle: {
                                            width: 1,
                                            color: 'rgba(60,135,213,.3)'
                                        }
                                    }
                                }
                            }
                        ]
                    }
                ]
            })
        }
    },
    beforeDestroy () {
        clearInterval(this.timerInterval)
    }
}
</script>

<style lang="less" scoped>
</style>
