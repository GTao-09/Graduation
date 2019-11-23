<template>
    <div class="books-view">
        <el-tooltip effect="dark" placement="right" v-for="item in bookArr" :key="item.id">
            <p slot="content" class="tooltip-title">
                {{ item.title }}
            </p>
            <p slot="content" class="tooltip-author">
                <span>{{ item.author }}</span> /
                <span>{{ item.date }}</span> /
                <span>{{ item.press }}</span>
            </p>
            <p slot="content" class="abstract">{{ item.introduction }}</p>
            <el-card class="book" shadow="hover">
                <div class="cover" @click="editBook(item)">
                    <img src="../../assets/books/s2768378.jpg" alt="封面">
                    <!-- <img :src="item.cover" alt="封面"> -->
                </div>
                <div class="info">
                    <div class="title">
                        <div>{{ item.title }}</div>
                    </div>
                    <i class="el-icon-delete" @click="deleteBook(item.id)"></i>
                </div>
                <div class="author">{{ item.author }}</div>
            </el-card>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'BooksView', // 图书展示 (视图形式)
    data () {
        return {
            bookArr: [
                {
                    id: '123',
                    // 浮窗
                    title: 'titleTest',
                    author: 'authorTest',
                    date: '2019-11-18',
                    press: '出版社',
                    introduction: '介绍'
                }
            ]
        }
    },
    methods: {
        editBook (val) {
            console.log(val)
        },
        deleteBook (val) {
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '删除成功!',
                    duration: 1000
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                    duration: 1000
                })
            })
            console.log(val)
        }
    }
}
</script>

<style lang="less" scoped>
.books-view /deep/ .el-card__body {
    padding: 0;
}
.cover {
    width: 115px;
    height: 172px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 7px;
    margin-top: 8px;
    overflow: hidden;
    cursor: pointer;
}
.tooltip-title {
    font-size: 14px;
    margin-bottom: 6px;
}
.tooltip-author {
    font-size: 13px;
    margin-bottom: 6px
}

img {
    width: 115px;
    height: 172px;
    /*margin: 0 auto;*/
}

.title {
    font-size: 14px;
    text-align: left;
    padding: 5px;
    padding-bottom: 2px;
    padding-top: 2px;
}

.author {
    color: #333;
    // width: 102px;
    font-size: 13px;
    margin-bottom: 2px;
    text-align: left;
    padding-left: 5px;
}

.abstract {
    width: 300px;
    display: block;
    line-height: 17px;
}

.el-icon-delete {
    cursor: pointer;
    float: right;
    padding-right: 5px;
}

.book {
    width: 135px;
    margin-bottom: 20px;
    height: 233px;
    float: left;
    margin-right: 30px
}
</style>
