<template>
    <div class="login">
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-container" label-position="left" label-width="0px">
            <h3 class="login_title">系统登录</h3>
            <el-form-item prop="username">
                <el-input type="text" v-model="loginForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item prop="password">
                <el-input type="password" v-model="loginForm.password" auto-complete="off" show-password placeholder="密码"></el-input>
            </el-form-item>
            <el-checkbox class="login_remember" v-model="checked" label-position="left"><span style="color: #505458">记住密码</span></el-checkbox>
            <el-form-item style="width: 100%">
                <el-button type="primary" class="login-btn" @click="loginBtn">登录</el-button>
                <!-- <router-link to="register"><el-button type="primary" style="width: 40%;background: #505458;border: none">注册</el-button></router-link> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Login', // 登录
    data () {
        return {
            checked: true,
            loginForm: {
                username: '',
                password: ''
            },
            rules: {
                username: [{ required: true, message: '用户名不能为空', trigger: 'blur' }],
                password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
            }
        }
    },
    methods: {
        loginBtn () {
            this.$refs['loginForm'].validate((valid) => {
                if (valid) {
                    this.$ajax({
                        type: 'login',
                        data: {
                            name: this.loginForm.username,
                            password: this.loginForm.password
                        },
                        method: 'post'
                    }).then(res => {
                        if (res.data.success) {
                            this.$store.commit('TOKEN', res.data.data)
                            this.$router.push({ path: '/' })
                        }
                    })
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
.login {
    background: url("../assets/bg/subject-bg.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
    left: 0;
    top: 0;
}
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 90px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
}
.login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
}
.login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
}
.login-btn {
    width: 40%;
    background-color: #505458;
    border: none
}
</style>
