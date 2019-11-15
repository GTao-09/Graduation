<template>
    <div class="log">
        <el-container>
            <el-header>
                <el-input class="input-style" @keyup.enter.native="findTitle" clearable v-model="inputTitle" placeholder="请输入标题查询对应的log">
                    <el-button @click="findTitle" slot="append" icon="el-icon-search">搜索</el-button>
                </el-input>
            </el-header>
            <el-main>
                <div class="add-log"><i class="el-icon-circle-plus-outline icon-style"></i></div>
                <!-- 用v-for来弄, 可以放到数据库，也可以只本地存储 (看情况) -->
                <template v-for="item in 8">
                    <div @click="editLog(item)" class="log-content" :key="item">
                        <div class="module">
                            <img src="../../assets/icon/icon1.png" alt="">
                            <span class="sub-name">[HelloWorld]</span>
                            <br>
                            <br>
                            <br>
                            <span class="desc">开启程序人生！</span>
                        </div>
                    </div>
                </template>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Log', // 日志
    data () {
        return {
            inputTitle: ''
        }
    },
    methods: {
        editLog () {
            console.log('editLog')
        },
        findTitle () { // 搜索
            console.log(this.inputTitle)
        }
    }
}
</script>

<style lang="less" scoped>
.log {
    width: 90%;
    margin: 0 auto;
}
.module {
    cursor: pointer;
    display: block;
    width: 280px;
    height: 150px;
    margin: 30px;
    padding: 15px;
    background-color: #DCDFE6;
    float: left;
    border-radius: 18px;
    position: relative;
    text-decoration: none;
    font-family: "PingFang SC";
    color: rgb(84, 92, 100);
}
.module img {
    float: left;
}
span.sub-name {
    float: right;
    font-size: 20px;
}
span.desc {
    font-size: 20px;
}
.add-log {
    cursor: pointer;
    float: left;
    width: 280px;
    height: 150px;
    margin: 45px;
}
.icon-style {
    margin: 50px 100px;
    font-size: 100px
}
.input-style {
    width: 60%;
}
</style>
