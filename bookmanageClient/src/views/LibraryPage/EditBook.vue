<template>
    <div class="edit-book">
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <el-form v-model="form" ref="bookForm" :rules="rules" label-width="80px" style="width: 60%; margin: 0 auto;">
                    <el-form-item label="id" prop="id">
                        <el-input readonly v-model="form.id" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="书名" prop="title">
                        <el-input v-model="form.title" autocomplete="off" placeholder="不加《》"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出版日期" prop="date">
                        <el-input v-model="form.date" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="出版社" prop="press">
                        <el-input v-model="form.press" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="封面" prop="cover">
                        <el-input v-model="form.cover" autocomplete="off" placeholder="图片 URL"></el-input>
                        <img-upload @onUpload="uploadImg" ref="imgUpload"></img-upload>
                    </el-form-item> -->
                    <el-form-item label="简介" prop="introduction">
                        <el-input type="textarea" v-model="form.introduction" autocomplete="off"></el-input>
                    </el-form-item>
                    <!-- ============== -->
                    <el-form-item label="分类" prop="classification">
                        <el-select v-model="form.classification" style="width: 100%;" placeholder="请选择分类">
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
    name: 'EditBook', // 编辑图书
    data () {
        return {
            dialogFormVisible: false,
            form: {
                id: '123',
                title: '',
                author: '',
                date: '',
                press: '',
                introduction: '',
                classification: '' // 分类
            },
            rules: {}
        }
    },
    methods: {
        onSubmit () { // 提交
            this.$refs['bookForm'].validate((valid) => {
                if (valid) {
                    console.log(this.form)
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        message: '请查看未填写信息或错误信息',
                        type: 'warning'
                    })
                    return false
                }
            })
        },
        resetForm () {
            this.$refs['bookForm'].resetFields()
        }
    }
}
</script>

<style lang="less" scoped>

</style>
