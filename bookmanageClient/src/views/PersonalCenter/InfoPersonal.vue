<template>
    <div class="info-personal">
        <h1>个人信息</h1>
        <el-form label-position="right" label-width="150px" v-loading="contentLoading" :model="infoPersonalForm">
            <el-form-item v-if="infoPersonalForm._id" label="id:">
                {{ infoPersonalForm._id }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.name" label="用户名:">
                {{ infoPersonalForm.name }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.userName" label="真实姓名:">
                {{ infoPersonalForm.userName }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.identify" label="身份:">
                {{ identifyOptions[infoPersonalForm.identify] }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.gender" label="性别:">
                {{ genderOptions[infoPersonalForm.gender] }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.age" label="年龄:">
                {{ infoPersonalForm.age }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.entryTime" label="入职时间:">
                {{ infoPersonalForm.entryTime }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.birthday" label="出生年月:">
                {{ infoPersonalForm.birthday }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.tel" label="电话:">
                {{ infoPersonalForm.tel }}
            </el-form-item>
            <el-form-item v-if="infoPersonalForm.subordinateDepart" label="所属部门:">
                {{ infoPersonalForm.subordinateDepart }}
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
const genderOptions = {
    0: '女',
    1: '男'
}
const identifyOptions = {
    0: '管理员',
    1: '超级管理员'
}
export default {
    name: 'InfoPersonal', // 个人信息
    mounted () {
        if (this.$store.state.token && Object.keys(this.$store.state.token).length) {
            this.userSearch(this.$store.state.token.name)
        }
    },
    data () {
        return {
            identifyOptions,
            genderOptions,
            infoPersonalForm: {},
            contentLoading: false
        }
    },
    methods: {
        userSearch (val) { // 查询用户
            this.contentLoading = true
            this.$ajax({
                type: 'userSearch',
                data: {
                    name: val,
                    type: 1 // 精确查询
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.infoPersonalForm = res.data.data[0]
                    this.contentLoading = false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.info-personal /deep/ .el-form-item__label {
    font-weight: bold;
}
.info-personal /deep/ .el-form-item__content {
    text-align: left;
}
</style>
