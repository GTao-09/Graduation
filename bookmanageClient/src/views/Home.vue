<template>
    <div class="home">
        <!-- v-if="flag" -->
        <HeaderNav ></HeaderNav>
        <!-- v-if="flag" -->
        <router-view />
    </div>
</template>

<script>
import HeaderNav from './HeaderNav'
export default {
    name: 'Home', // 主页
    components: {
        HeaderNav
    },
    mounted () {
        // 前端开发时先注释掉
        // if (this.$store.state.token) {
        //     this.flag = true
        // } else {
        //     if (JSON.parse(window.localStorage.getItem('__graduationStore__')).graduationStore.token) {
        //         this.flag = true
        //         this.$store.commit('TOKEN', JSON.parse(window.localStorage.getItem('__graduationStore__')).graduationStore.token)
        //     } else {
        //         location.href = 'http://192.168.0.110:8080/login'
        //     }
        // }
    },
    data () {
        return {
            flag: false
        }
    }
}
</script>

<style lang="less" scoped>

.home {
    background-color: #F6F6F6;
    // min-width: 1200px;
}
</style>
