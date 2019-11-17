<template>
    <div class="library">
        <SideMenu @indexSelect="listByCategory"></SideMenu>
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="8" :offset="5">
                        <el-input class="input-style" @keyup.enter.native="findBook" clearable v-model="inputBookName" placeholder="请输入书名">
                            <el-button @click="findBook" slot="append" icon="el-icon-search">搜索</el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" @click="addBook" plain>添加图书</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-switch
                            class="switch-btn"
                            v-model="value1"
                            active-text="列表显示">
                        </el-switch>
                    </el-col>
                </el-row>
            </el-header>
            <el-container style="width: 80%; margin: 0 auto;">
                <el-main>
                    <!-- 图书图片展示组件 -->
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import SideMenu from './SideMenu'
export default {
    name: 'Library', // 图书馆
    components: {
        SideMenu
    },
    data () {
        return {
            inputBookName: '',
            value1: false
        }
    },
    methods: {
        listByCategory (val) { // 侧导航值
            console.log(val)
        },
        findBook () { // 书名搜索
            console.log(this.inputBookName)
        },
        addBook () { // 添加图书
            console.log('addBook')
        }
    }
}
</script>

<style lang="less" scoped>
.library {
    // background-color: #fff;
}
.input-style {
    width: 100%;
    vertical-align: middle;
}
.switch-btn {
    vertical-align: middle;
}
</style>
