<template>
    <div v-loading="contentLoading" class="user-config">
        <el-header>
            <el-row :gutter="10">
                <el-col :span="8" :offset="5">
                    <!-- @keyup.enter.native="findBook"  -->
                    <el-input @keyup.enter.native="findUser" class="input-style" clearable v-model="inputName" placeholder="请输入姓名">
                        <el-button @click="findUser" slot="append" icon="el-icon-search">搜索</el-button>
                    </el-input>
                </el-col>
            </el-row>
        </el-header>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="_id" label="id" align="center"></el-table-column>
            <el-table-column prop="name" label="用户名" align="center"></el-table-column>
            <el-table-column prop="userName" label="真实姓名" align="center"></el-table-column>
            <el-table-column prop="identify" label="身份" align="center"></el-table-column>
            <el-table-column prop="gender" label="性别" align="center"></el-table-column>
            <el-table-column prop="age" label="年龄" align="center"></el-table-column>
            <el-table-column prop="entryTime" label="入职时间" align="center"></el-table-column>
            <el-table-column prop="birthday" label="出生年月" align="center"></el-table-column>
            <el-table-column prop="tel" label="电话" align="center"></el-table-column>
            <el-table-column prop="subordinateDepart" label="所属部门" align="center"></el-table-column>
            <el-table-column prop="auditing" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" @click="editUser(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-footer>
            <Pagination :total="total" :page.sync="userConfig.pageNum" :pageSize.sync="userConfig.pageSize" @pagination="userSearch"></Pagination>
        </el-footer>
    </div>
</template>

<script>
import Pagination from '../../components/Pagination'
export default {
    name: 'UserConfig', // 用户配置
    components: {
        Pagination
    },
    mounted () {
        this.userSearch()
    },
    data () {
        return {
            inputName: '',
            total: null,
            contentLoading: false,
            tableData: [],
            userConfig: {
                pageNum: 1, // 页数
                pageSize: 10 // 每页条数
            }
        }
    },
    methods: {
        editUser (val) {
            console.log(val)
        },
        findUser () {
            this.userSearch(this.inputName)
        },
        userSearch (val) { // 查询用户
            this.contentLoading = true
            this.$ajax({
                type: 'userSearch',
                data: {
                    name: val
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.total = res.data.total
                    this.tableData = res.data.data || []
                    this.contentLoading = false
                }
            })
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
