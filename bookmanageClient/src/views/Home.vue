<template>
    <div class="home">
        <HeaderNav></HeaderNav>
        <router-view />
    </div>
</template>

<script>
import HeaderNav from './HeaderNav'
export default {
    name: 'Home', // 主页
    components: {
        HeaderNav
    }
}
</script>

<style lang="less" scoped>
.home {
    background-color: #F6F6F6;
    min-width: 1200px;
}
</style>
