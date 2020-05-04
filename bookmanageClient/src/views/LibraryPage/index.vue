<template>
    <div class="library">
        <SideMenu @indexSelect="listByCategory"></SideMenu>
        <el-container>
            <el-header>
                <el-row :gutter="20">
                    <el-col :span="8" :offset="5">
                        <!-- @keyup.enter.native="findBook"  -->
                        <el-input class="input-style" clearable v-model="inputBookName" placeholder="请输入书名">
                            <el-button slot="append" icon="el-icon-search">搜索</el-button>
                        </el-input>
                    </el-col>
                    <el-col :span="6">
                        <el-button type="success" @click="addBook" plain>添加图书</el-button>
                    </el-col>
                    <el-col :span="3">
                        <el-switch
                            class="switch-btn"
                            v-model="switchValue"
                            active-text="列表显示">
                        </el-switch>
                    </el-col>
                </el-row>
            </el-header>
            <el-container style="width: 80%; margin: 0 auto;">
                <el-main v-loading="contentLoading">
                    <!-- 图书图片展示组件 -->
                    <BookList v-if="switchValue" :bookArr="filterBy(bookArr, inputBookName)" @BookEdit="bookEdit" @BookDelete="BookDelete"></BookList>
                    <BooksView v-else :bookArr="filterBy(bookArr, inputBookName)" @BookEdit="bookEdit" @BookDelete="BookDelete"></BooksView>
                </el-main>
                <el-footer>
                    <Pagination :total="total" :page.sync="addBookForm.pageNum" :pageSize.sync="addBookForm.pageSize" @pagination="bookSearch"></Pagination>
                </el-footer>
            </el-container>
        </el-container>
        <!-- 添加图书 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="resetForm" :close-on-click-modal="false">
            <el-form :model="addBookForm" :rules="rules" ref="addBookForm">
                <el-form-item v-if="dialogTitle === '添加图书'" label="ISBN" prop="ISBN">
                    <el-input v-model="addBookForm.ISBN" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item v-else label="ISBN" prop="ISBN">
                    <el-input readonly v-model="addBookForm.ISBN" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="书名" prop="bookName">
                    <el-input v-model="addBookForm.bookName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="作者" prop="bookAuthor">
                    <el-input v-model="addBookForm.bookAuthor" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版社" prop="bookPress">
                    <el-input v-model="addBookForm.bookPress" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="定价" prop="bookPricing">
                    <el-input v-model="addBookForm.bookPricing" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="出版年" prop="yearOfPublication">
                    <el-date-picker
                        style="width: 100%"
                        v-model="addBookForm.yearOfPublication"
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="类别" prop="bookCategory">
                    <el-select v-model="addBookForm.bookCategory" style="width: 100%" placeholder="请选择">
                        <el-option
                            v-for="item in bookCategoryOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="简介" prop="remake">
                    <el-input type="textarea" v-model="addBookForm.remake"></el-input>
                </el-form-item>
                <el-form-item label="封面" prop="cover">
                    <el-upload
                        class="avatar-uploader"
                        action="http://127.0.0.1:5009/upload"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        :on-remove="handleRemove">
                        <img v-if="addBookForm.cover" :src="addBookForm.cover" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button v-if="dialogTitle === '添加图书'" type="primary" @click="submitForm">确 定</el-button>
                <el-button v-else type="primary" @click="bookEditBtn">确 定</el-button>
            </div>
        </el-dialog>
        <!-- <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog> -->
    </div>
</template>

<script>
import SideMenu from './SideMenu'
import BooksView from './BooksView'
import BookList from './BookList'
import { dateFormat } from '../../util/tools.js'
import Pagination from '../../components/Pagination'
const bookCategoryOptions = [
    { value: '1', label: '文学' },
    { value: '2', label: '流行' },
    { value: '3', label: '文化' },
    { value: '4', label: '生活' },
    { value: '5', label: '经管' },
    { value: '6', label: '科技' }
]
export default {
    name: 'Library', // 图书馆
    components: {
        SideMenu,
        BooksView,
        BookList,
        Pagination
    },
    mounted () {
        this.bookSearch()
    },
    data () {
        return {
            // dialogImageUrl: '',
            // dialogVisible: false,
            total: null,
            bookArr: [],
            sideMenuValue: null,
            contentLoading: false,
            dialogTitle: '添加图书',
            bookCategoryOptions,
            dialogFormVisible: false,
            addBookForm: {
                pageNum: 1, // 页数
                pageSize: 10, // 每页条数
                ISBN: '',
                bookName: '', // 书名
                bookCategory: '', // 类别
                bookAuthor: '', // 作者
                bookPress: '', // 出版社
                yearOfPublication: '', // 出版年
                bookPricing: '', // 定价
                remake: '', // 简介
                cover: '' // 封面
            },
            inputBookName: '',
            switchValue: false,
            rules: {
                ISBN: [
                    { required: true, message: '请添加ISBN', trigger: 'blur' }
                ],
                bookName: [
                    { required: true, message: '请添加书名', trigger: 'blur' }
                ],
                bookCategory: [
                    { required: true, message: '请选择类别', trigger: 'blur' }
                ],
                bookAuthor: [
                    { required: true, message: '请添加作者', trigger: 'blur' }
                ],
                yearOfPublication: [
                    { required: true, message: '请添加出版年', trigger: 'blur' }
                ],
                bookPress: [
                    { required: true, message: '请添加出版社', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        listByCategory (val) { // 侧导航值
            this.sideMenuValue = val
            this.bookSearch(val)
        },
        addBook () { // 添加图书
            this.dialogTitle = '添加图书'
            this.dialogFormVisible = true
        },
        bookEdit (item) {
            this.dialogTitle = '编辑图书'
            this.addBookForm = { ...item }
            this.dialogFormVisible = true
        },
        resetForm () { // 取消按钮
            this.dialogFormVisible = false
            this.$refs['addBookForm'].resetFields()
        },
        bookEditBtn () { // 编辑按钮
            let formData = { ...this.addBookForm }
            formData.yearOfPublication = dateFormat(this.addBookForm.yearOfPublication)
            this.$refs['addBookForm'].validate((valid) => {
                if (valid) {
                    this.bookEditAjax(formData)
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        message: '请查看未填写信息与错误信息',
                        type: 'warning',
                        duration: 1000
                    })
                    return false
                }
            })
        },
        submitForm () {
            let formData = { ...this.addBookForm }
            formData.yearOfPublication = dateFormat(this.addBookForm.yearOfPublication)
            this.$refs['addBookForm'].validate((valid) => {
                if (valid) {
                    this.bookAdd(formData)
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        message: '请查看未填写信息与错误信息',
                        type: 'warning',
                        duration: 1000
                    })
                    return false
                }
            })
        },
        BookDelete (val) {
            this.bookDelete(val)
        },
        filterBy (bookArr, value) {
            return bookArr.filter(book => {
                return book.bookName.match(value)
            })
        },
        bookSearch (val) { // 查询图书
            this.contentLoading = true
            this.$ajax({
                type: 'bookSearch',
                data: {
                    bookCategory: val
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    console.log(res.data)
                    this.total = res.data.total
                    this.bookArr = res.data.data || []
                    this.contentLoading = false
                }
            })
        },
        bookAdd (val) {
            this.$ajax({
                type: 'bookAdd',
                data: {
                    ...val
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    this.$message({
                        message: '添加成功！',
                        type: 'success',
                        duration: 1000
                    })
                    this.bookSearch(this.sideMenuValue)
                    this.resetForm()
                }
            })
        },
        bookEditAjax (val) {
            this.$ajax({
                type: 'bookEdit',
                data: {
                    ...val
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    this.$message({
                        message: '编辑成功！',
                        type: 'success',
                        duration: 1000
                    })
                    this.bookSearch(this.sideMenuValue)
                    this.resetForm()
                }
            })
        },
        bookDelete (val) {
            this.$ajax({
                type: 'bookDelete',
                data: {
                    ISBN: val
                },
                method: 'post'
            }).then(res => {
                if (res.data.success) {
                    this.$message({
                        message: '删除成功！',
                        type: 'success',
                        duration: 1000
                    })
                    this.bookSearch(this.sideMenuValue)
                }
            })
        },
        handleAvatarSuccess (res, file) {
            this.addBookForm.cover = res.filename
        },
        beforeAvatarUpload (file) {
            // const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2
            // if (!isJPG) {
            //     this.$message.error('上传头像图片只能是 JPG 格式!')
            // }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isLt2M
            // return isJPG && isLt2M
        },
        handleRemove (file, fileList) {
            console.log(file, fileList)
        }
    }
}
</script>

<style lang="less" scoped>
.library {
    // background-color: #fff;
}
.input-style {
    width: 100%;
    vertical-align: middle;
}
.switch-btn {
    vertical-align: middle;
}
.library /deep/ .el-icon-plus {
    border: 1px dashed #d9d9d9;
}
.avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
