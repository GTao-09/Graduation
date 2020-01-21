<template>
    <div class="home">
        <HeaderNav v-if="flag"></HeaderNav>
        <router-view v-if="flag"/>
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
        // 前端开发时的注释，记得放开注释
        if (this.$store.state.token && Object.keys(this.$store.state.token).length) {
            this.flag = true
        } else {
            if (JSON.parse(window.localStorage.getItem('__graduationStore__')) && Object.keys(JSON.parse(window.localStorage.getItem('__graduationStore__')).graduationStore.token).length) {
                this.flag = true
                this.$store.commit('TOKEN', JSON.parse(window.localStorage.getItem('__graduationStore__')).graduationStore.token)
            } else {
                location.href = 'http://192.168.1.7:8080/login'
            }
        }
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
