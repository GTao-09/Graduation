<template>
    <div class="nopage">
        <div class="image"></div>
    </div>
</template>

<script>
export default {
    name: 'NoPage'
}
</script>

<style lang="less" scoped>
.nopage {
    background-color: #fff;
    .image {
        background-image: url('../assets/nopage.jpg');
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        width: 70%;
        margin: auto;
    }
}
</style>
