<template>
    <div class="about">
        <div>
            <p class="alt">&copy; 版权所有：GongTao &nbsp;
                <span>技术支持：</span>
                <span style="color:#999;">GongTao</span>
                <!-- <a href="###" target="_blank" style="color:#999;">Evan & MMK</a> -->
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'About' // 关于我
}
</script>

<style lang="less" scoped>
 .about {
    background: #2b2e33;
    border-radius: 4px;
    .alt {
        overflow: hidden;
        padding: 20px 0;
        margin: 0 auto;
        color:#999;
        line-height:0;
    }
}
</style>
