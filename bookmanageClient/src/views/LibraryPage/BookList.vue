<template>
    <div class="user-config">
        <el-table :data="bookList" border style="width: 100%">
            <el-table-column prop="ISBN" label="ISBN" align="center"></el-table-column>
            <el-table-column prop="bookName" label="书名" align="center"></el-table-column>
            <el-table-column prop="bookAuthor" label="作者" align="center"></el-table-column>
            <el-table-column prop="bookPress" label="出版社" align="center"></el-table-column>
            <el-table-column prop="yearOfPublication" label="出版年" align="center"></el-table-column>
            <el-table-column prop="bookCategory" label="类别" align="center">
                <template slot-scope="scope">
                    {{ bookCategoryOptions[scope.row.bookCategory] }}
                </template>
            </el-table-column>
            <el-table-column prop="auditing" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" @click="editUser(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
const bookCategoryOptions = {
    1: '文学',
    2: '流行',
    3: '文化',
    4: '生活',
    5: '经管',
    6: '科技'
}
export default {
    name: 'BookList', // 图书列表形式展示
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
            bookCategoryOptions
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
        editUser (val) {
            this.$emit('BookEdit', val)
        }
    }
}
</script>

<style lang="less" scoped>
.user-config {
    padding: 10px;
}
.user-config /deep/ .el-table {
    font-size: 14px;
}
.user-config /deep/ .el-table th{
    background: #f8f8f9;
}
.user-config /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td{
    background-color: #EBF7FF !important;
}
</style>
