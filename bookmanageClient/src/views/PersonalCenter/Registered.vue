<template>
    <div class="registered">
        <el-container>
            <el-main>
                <el-form v-model="form" ref="registeredForm" :rules="rules" label-width="100px">
                    <el-form-item label="id" prop="id">
                        <el-input readonly v-model="form.id" class="" style="width: 500px;" autocomplete="off" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                        <el-input v-model="form.name" autocomplete="off" placeholder="请输入姓名" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="form.gender">
                            <el-radio label="0">女</el-radio>
                            <el-radio label="1">男</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="年龄" prop="age">
                        <el-input v-model="form.age" autocomplete="off" placeholder="请输入年龄" clearable></el-input>
                    </el-form-item>
                    <el-form-item label="出生年月日" prop="birthdate">
                        <el-date-picker
                            v-model="form.birthdate"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="登录系统密码" prop="password">
                        <el-input v-model="form.password" show-password autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- ============== -->
                    <el-form-item label="职位" prop="identity">
                        <el-select v-model="form.identity" clearable style="width: 100%;">
                            <!-- <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option> -->
                            <!-- <el-option label="文学" value="1"></el-option>
                            <el-option label="流行" value="2"></el-option>
                            <el-option label="文化" value="3"></el-option>
                            <el-option label="生活" value="4"></el-option>
                            <el-option label="经管" value="5"></el-option>
                            <el-option label="科技" value="6"></el-option> -->
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-main>
            <el-footer>
                <div>
                    <el-button @click="resetForm">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </div>
            </el-footer>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Registered', // 注册
    data () {
        return {
            form: {
                id: '',
                name: '',
                gender: '1',
                age: '',
                birthdate: '',
                password: '',
                identity: ''
            },
            rules: {}
        }
    },
    methods: {
        resetForm () {
            this.$refs['registeredForm'].resetFields()
        },
        onSubmit () {
            this.$refs['registeredForm'].validate((valid) => {
                if (valid) {
                    console.log(this.form)
                } else {
                    this.$message({
                        message: '请查看未填写信息或错误信息',
                        type: 'warning'
                    })
                    return false
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.registered {
    text-align: left;
}
</style>
