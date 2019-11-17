<template>
    <div class="down-code">
        <el-card class="box-card">
            <div style="font-size: 45px;color: azure;white-space: nowrap">Talk is nothing, show you my code.</div>
            <a href="https://github.com/GTao-09/Graduation" target="_blank">
                <img src="../../assets/icon/icon6.png" alt="github" title="github" class="git-link">
            </a>
        </el-card>
    </div>
</template>

<script>
export default {
    name: 'DownCode' // 下载源码模块
}
</script>

<style lang="less" scoped>
.box-card {
    width: 100%;
    height: 150px;
    background-color: #222;
    text-align: center;
    margin: 0 auto;
    margin-top: 5px;
}

.git-link {
    width: 80px;
    /*position: absolute;*/
}
</style>
