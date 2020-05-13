<template>
     <div class="borrowing">
        <el-container>
            <el-header>
                <el-input class="input-style" @keyup.enter.native="findName" clearable v-model="inputName" placeholder="请输入借阅人名称">
                    <el-button @click="findName" slot="append" icon="el-icon-search">搜索</el-button>
                </el-input>
                <el-button type="success" @click="borrowingBook">借阅</el-button>
            </el-header>
            <el-main>
                 <el-table :data="tableData" border style="width: 100%">
                    <el-table-column prop="name" label="借阅人" align="center"></el-table-column>
                    <el-table-column prop="nameId" label="借阅人编号" align="center"></el-table-column>
                    <el-table-column prop="borrowingDate" label="借阅日期" align="center"></el-table-column>
                    <el-table-column prop="returnDate" label="预定归还日期" align="center"></el-table-column>
                    <el-table-column prop="ISBN" label="ISBN" align="center"></el-table-column>
                    <el-table-column prop="bookName" label="书名" align="center"></el-table-column>
                    <el-table-column prop="bookAuthor" label="作者" align="center"></el-table-column>
                    <el-table-column prop="bookPress" label="出版社" align="center"></el-table-column>
                    <el-table-column prop="yearOfPublication" label="出版年" align="center"></el-table-column>
                    <el-table-column prop="bookPricing" label="定价" align="center"></el-table-column>
                    <!-- <el-table-column prop="fine" label="罚金" align="center"></el-table-column> -->
                    <el-table-column prop="Operator" label="操作人" align="center"></el-table-column>
                    <el-table-column prop="auditing" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button type="text" @click="deleteBorrowing(scope.row)">归还</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
        <el-dialog title="图书借阅" :visible.sync="dialogFormVisible" width="50%">
            <el-form :model="form" :rules="rules" ref="ruleForm" :inline="true" :label-width="formLabelWidth">
                <el-form-item label="借阅人" prop="name">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="借阅人编号" prop="nameId">
                    <el-input v-model="form.nameId" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="借阅日期" prop="borrowingDate">
                    <!-- <el-input v-model="form.borrowingDate" autocomplete="off"></el-input> -->
                    <el-date-picker type="date" placeholder="选择日期" v-model="form.borrowingDate" class="date-picker" @change="sureReturnDate"></el-date-picker>
                </el-form-item>
                <el-form-item label="归还日期" prop="returnDate">
                    <el-input v-model="form.returnDate" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="ISBN" prop="ISBN">
                    <el-input v-model="form.ISBN" autocomplete="off" @blur.native.capture="borrowingBookISBN(form.ISBN)"></el-input>
                </el-form-item>
                <el-form-item label="书名" prop="bookName">
                    <el-input v-model="form.bookName" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="bookAuthor">
                    <el-input v-model="form.bookAuthor" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="bookPress">
                    <el-input v-model="form.bookPress" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="出版年" prop="yearOfPublication">
                    <el-input v-model="form.yearOfPublication" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="定价" prop="bookPricing">
                    <el-input v-model="form.bookPricing" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="操作人" prop="Operator">
                    <el-input v-model="form.Operator" autocomplete="off" :disabled="true"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('ruleForm')">取 消</el-button>
                <el-button type="primary" @click="borrowingSure('ruleForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { dateFormat } from '../../util/tools'
export default {
    name: 'borrowingPage',
    mounted () {
        this.operatorName = this.$store.state.token.name
        this.borrowingsSearch() // 借阅人查询接口
    },
    watch: {
        /* 'form.ISBN' (val) {
            this.borrowingBookISBN(val)
        } */
    },
    data () {
        return {
            inputName: '',
            tableData: [],
            operatorName: '',
            form: {
                name: '',
                nameId: '',
                borrowingDate: '',
                returnDate: '',
                ISBN: '',
                bookName: '',
                bookAuthor: '',
                bookPress: '',
                yearOfPublication: '',
                bookPricing: '',
                Operator: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
            rules: {
                name: [
                    { required: true, message: '请输入姓名', trigger: 'change' }
                ],
                nameId: [
                    { required: true, message: '请输入编号', trigger: 'change' }
                ],
                borrowingDate: [
                    { required: true, message: '请输入日期', trigger: 'change' }
                ],
                ISBN: [
                    { required: true, message: '请输入书籍编号', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        resetForm (formName) {
            this.$refs[formName].resetFields()
            this.dialogFormVisible = false
        },
        findName () {
            console.log(this.inputName)
            if (this.inputName) {
                let newTabel = this.tableData.filter(mes => {
                    return mes.name.match(this.inputName)
                })
                this.tableData = newTabel
            } else {
                this.borrowingsSearch()
            }
        },
        sureReturnDate (val) {
            if (val) {
                let date2 = new Date(val)
                date2.setDate(val.getDate() + 30)
                let returnMonth = null
                if (date2.getMonth() + 1 < 10) {
                    returnMonth = '0' + (date2.getMonth() + 1)
                } else {
                    returnMonth = date2.getMonth() + 1
                }
                this.form.returnDate = date2.getFullYear() + '-' + returnMonth + '-' + date2.getDate()
                console.log(date2.getFullYear() + '-' + returnMonth + '-' + date2.getDate())
            } else {
                this.form.returnDate = ''
            }
        },
        borrowingBook () {
            this.dialogFormVisible = true
            this.form.Operator = this.operatorName
            console.log('借阅')
        },
        borrowingSure (formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.borrowingDate = dateFormat(this.form.borrowingDate)
                    this.$ajax({
                        type: 'borrowingAdd',
                        data: this.form,
                        method: 'post'
                    }).then(res => {
                        if (res.data.success) {
                            console.log(res.data.data)
                            this.$refs[formName].resetFields()
                            this.borrowingsSearch()
                        }
                    })
                    this.dialogFormVisible = false
                } else {
                    this.$message.error('提交出错，请查看输入信息')
                    return false
                }
            })
        },
        borrowingsSearch () {
            this.$ajax({
                type: 'borrowingsSearch',
                data: {},
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    let resData = res.data.data || []
                    // resData.map(item => {
                    //     let borrDate = item.borrowingDate.replace(new RegExp('-', 'gm'), '/')
                    //     let retDate = item.returnDate.replace(new RegExp('-', 'gm'), '/')
                    //     let cutDate = (new Date(retDate).getTime() - new Date(borrDate).getTime()) / 1000 / 60 / 60 / 24
                    //     if (cutDate > 30) {
                    //         item['fine'] = (cutDate - 30) * 10
                    //     } else {
                    //         item['fine'] = 0
                    //     }
                    // })
                    this.tableData = resData
                }
            })
        },
        borrowingBookISBN (val) { // 图书ISBN查询信息
            this.$ajax({
                type: 'bookSearch',
                data: {},
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    let bookAllArr = res.data.data
                    let searchBook = bookAllArr.filter(book => {
                        return book.ISBN.match(val)
                    })
                    if (searchBook.length === 0) {
                        this.$confirm(`书库暂没有ISBN为${val}的图书`, '提示', {
                            confirmButtonText: '确定',
                            type: 'warning'
                        }).then(() => {
                            this.form.ISBN = ''
                            this.form.bookName = ''
                            this.form.bookAuthor = ''
                            this.form.bookPress = ''
                            this.form.yearOfPublication = ''
                            this.form.bookPricing = ''
                        })
                        this.form.ISBN = ''
                        this.form.bookName = ''
                        this.form.bookAuthor = ''
                        this.form.bookPress = ''
                        this.form.yearOfPublication = ''
                        this.form.bookPricing = ''
                    } else {
                        this.form.bookName = searchBook[0].bookName
                        this.form.bookAuthor = searchBook[0].bookAuthor
                        this.form.bookPress = searchBook[0].bookPress
                        this.form.yearOfPublication = searchBook[0].yearOfPublication
                        this.form.bookPricing = searchBook[0].bookPricing
                    }
                }
            })
        },
        deleteBorrowing (val) {
            console.log(val)
            let fine = null
            let today = new Date()
            let todayDate = dateFormat(today)
            let borrDate = val.borrowingDate.replace(new RegExp('-', 'gm'), '/')
            let retDate = todayDate.replace(new RegExp('-', 'gm'), '/')
            let cutDate = (new Date(retDate).getTime() - new Date(borrDate).getTime()) / 1000 / 60 / 60 / 24
            if (cutDate > 30) {
                fine = (cutDate - 30) * 10
            } else {
                fine = 0
            }
            this.$confirm(`确定要归还吗？归还所需罚金为${fine}元`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
            }).then(() => {
                // borrowDelete
                this.$ajax({
                    type: 'borrowDelete',
                    data: val,
                    method: 'post'
                }).then(res => {
                    if (res.data.success) {
                        this.$message({
                            type: 'success',
                            message: '归还成功!'
                        })
                        this.borrowingsSearch()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消归还'
                })
            })
        }
    }
}
</script>

<style  lang="less" scoped>
.input-style {
    width: 50%;
    margin-right: 50px;
}
.borrowing /deep/ .el-table {
    font-size: 14px;
}
.borrowing /deep/ .el-table th{
    background: #f8f8f9;
}
.borrowing /deep/ .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #EBF7FF !important;
}
.borrowing /deep/ .el-input.is-disabled .el-input__inner {
    color: #606266;
}
.date-picker {
    width: 159px;
}
</style>
