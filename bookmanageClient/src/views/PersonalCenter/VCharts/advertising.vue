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
                { 'name': '图书馆', 'site': '最新消息1', 'gsmc': '1' },
                { 'name': '图书馆', 'site': '最新消息2', 'gsmc': '2' },
                { 'name': '图书馆', 'site': '最新消息3', 'gsmc': '3' },
                { 'name': '图书馆', 'site': '最新消息4', 'gsmc': '4' },
                { 'name': '图书馆', 'site': '最新消息5', 'gsmc': '5' },
                { 'name': '图书馆', 'site': '最新消息6', 'gsmc': '6' }
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
