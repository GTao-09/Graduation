<template>
    <div class="advertising">
        <div class="nwwest-roll" id="nwwest-roll">
            <ul id="roll-ul">
                <li v-for="(item, index) in list" ref="rollul" class="li-style" :class="{anim:animate==true}" :key="index">
                    <span class="name">{{item.name}}</span>
                    <span class="site">{{item.site}}</span>
                    <span class="gsmc">{{item.gsmc}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'advertising',
    created () {
        setInterval(this.scroll, 2000)
    },
    data () {
        return {
            animate: true,
            list: [
                { 'name': '于先生1', 'site': '北京门头沟区1', 'gsmc': '柠檬树装饰1' },
                { 'name': '于先生2', 'site': '北京门头沟区2', 'gsmc': '柠檬树装饰2' },
                { 'name': '于先生3', 'site': '北京门头沟区3', 'gsmc': '柠檬树装饰3' },
                { 'name': '于先生4', 'site': '北京门头沟区4', 'gsmc': '柠檬树装饰4' },
                { 'name': '于先生5', 'site': '北京门头沟区5', 'gsmc': '柠檬树装饰5' },
                { 'name': '于先生6', 'site': '北京门头沟区6', 'gsmc': '柠檬树装饰6' },
                { 'name': '于先生7', 'site': '北京门头沟区7', 'gsmc': '柠檬树装饰7' },
                { 'name': '于先生8', 'site': '北京门头沟区8', 'gsmc': '柠檬树装饰8' },
                { 'name': '于先生9', 'site': '北京门头沟区9', 'gsmc': '柠檬树装饰9' },
                { 'name': '于先生10', 'site': '北京门头沟区10', 'gsmc': '柠檬树装饰10' },
                { 'name': '于先生11', 'site': '北京门头沟区11', 'gsmc': '柠檬树装饰11' }
            ]
        }
    },
    methods: {
        scroll () {
            let con1 = this.$refs.rollul
            con1[0].style.marginTop = '30px'
            this.animate = !this.animate
            setTimeout(() => {
                this.list.push(this.list[0])
                this.list.shift()
                con1[0].style.marginTop = '0px'
                this.animate = !this.animate // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
            }, 0)
        }
    }
}
</script>

<style lang="less" scoped>
.newest-bill .nwwest-roll {
    padding-left: 15px;
    height: 210px;
    margin: 10px auto;
    overflow: hidden;
    transition: all 0.5s;
}
.newest-bill .nwwest-roll li {
    height: 35px;
    line-height: 35px;

}
.anim{
    transition: all 0.5s;
}
.advertising {
    width: 200px;
    height: 50px;
    border: 1px solid black;
}
.li-style {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>
