<template>
    <div class="personal-center">
        <el-container>
            <LeftNav @select="select"></LeftNav>
            <el-main>
                <router-view v-if="refresh" :key="key"></router-view>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import LeftNav from './LeftNav'
export default {
    name: 'PersonalCenter', // 个人中心
    components: {
        LeftNav
    },
    computed: {
        key () {
            return this.$route.path + Math.random()
        }
    },
    data () {
        return {
            refresh: true
        }
    },
    methods: {
        select (val) {
            this.refresh = false
            this.$nextTick(() => {
                this.refresh = true
            })
        }
    }
}
</script>

<style lang="less" scoped>
.personal-center {
    background-color: #ffffff;
    margin-top: -40px;
    margin-left: -8px;
}
.personal-center /deep/ .el-main {
    padding: 0;
}
</style>
