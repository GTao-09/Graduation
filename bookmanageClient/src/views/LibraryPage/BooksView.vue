<template>
    <div class="books-view">
        <el-tooltip effect="dark" placement="right" v-for="(item, index) in bookList" :key="index">
            <p slot="content" class="tooltip-title">
                {{ item.bookName }}
            </p>
            <p slot="content" class="tooltip-author">
                <span>{{ item.bookAuthor }}</span> /
                <span>{{ item.yearOfPublication }}</span> /
                <span>{{ item.bookPress }}</span>
            </p>
            <p slot="content" class="abstract">{{ item.remake }}</p>
            <el-card class="book" shadow="hover">
                <div class="cover" @click="editBook(item)">
                    <img src="../../assets/books/s2768378.jpg" alt="封面">
                    <!-- <img :src="item.cover" alt="封面"> -->
                </div>
                <div class="info">
                    <div class="title">
                        <div>{{ item.bookName }}</div>
                    </div>
                    <i class="el-icon-delete" @click="deleteBook(item.ISBN)"></i>
                </div>
                <div class="author">{{ item.bookAuthor }}</div>
            </el-card>
        </el-tooltip>
    </div>
</template>

<script>
export default {
    name: 'BooksView', // 图书展示 (视图形式)
    props: {
        bookArr: {
            type: Array,
            defalute: () => []
        }
    },
    computed: {
        bookList () {
            return this.bookArr
        }
    },
    data () {
        return {
            // bookArr: [
            //     {
            //         ISBN: '123',
            //         bookName: 'bookNameTest', // 书名
            //         bookCategory: '1', // 类别
            //         bookAuthor: 'bookAuthorTest', // 作者
            //         bookPress: 'bookPressTest', // 出版社
            //         yearOfPublication: '2019-12-01', // 出版年
            //         bookPricing: '99999', // 定价
            //         remake: 'test' // 简介
            //     }
            // ]
        }
    },
    methods: {
        editBook (val) {
            this.$emit('BookEdit', val)
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
