<template>
    <div class="user-config">
        <el-table :data="tableData" height="250" border style="width: 100%">
            <el-table-column prop="date" label="日期" align="center"></el-table-column>
            <el-table-column prop="name" label="姓名" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column prop="auditing" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" type="primary" @click="editUser(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'UserConfig', // 用户配置
    data () {
        return {
            tableData: [
                {
                    date: '123',
                    name: 'test',
                    address: 'test'
                }
            ]
        }
    },
    methods: {
        editUser (val) {
            console.log(val)
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
