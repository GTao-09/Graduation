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
                <el-main>
                    <!-- 图书图片展示组件 -->
                    <BookList v-if="switchValue" :bookArr="filterBy(bookArr, inputBookName)" @BookEdit="bookEdit"></BookList>
                    <BooksView v-else :bookArr="filterBy(bookArr, inputBookName)" @BookEdit="bookEdit"></BooksView>
                </el-main>
            </el-container>
        </el-container>
        <!-- 添加图书 -->
        <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible" :before-close="resetForm" :close-on-click-modal="false">
            <el-form :model="addBookForm" :rules="rules" ref="addBookForm">
                <el-form-item label="ISBN" prop="ISBN">
                    <el-input v-model="addBookForm.ISBN" autocomplete="off"></el-input>
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm">取 消</el-button>
                <el-button type="primary" @click="submitForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import SideMenu from './SideMenu'
import BooksView from './BooksView'
import BookList from './BookList'
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
        BookList
    },
    data () {
        return {
            // test数据
            bookArr: [
                {
                    ISBN: '123',
                    bookName: 'bookT', // 书名
                    bookCategory: '1', // 类别
                    bookAuthor: 'bookAuthorTest', // 作者
                    bookPress: 'bookPressTest', // 出版社
                    yearOfPublication: '2019-12-01', // 出版年
                    bookPricing: '99999', // 定价
                    remake: 'test' // 简介
                },
                {
                    ISBN: '123',
                    bookName: 'bookNameTest', // 书名
                    bookCategory: '1', // 类别
                    bookAuthor: 'bookAuthorTest', // 作者
                    bookPress: 'bookPressTest', // 出版社
                    yearOfPublication: '2019-12-01', // 出版年
                    bookPricing: '99999', // 定价
                    remake: 'test' // 简介
                },
                {
                    ISBN: '123',
                    bookName: 'jjjj', // 书名
                    bookCategory: '1', // 类别
                    bookAuthor: 'bookAuthorTest', // 作者
                    bookPress: 'bookPressTest', // 出版社
                    yearOfPublication: '2019-12-01', // 出版年
                    bookPricing: '99999', // 定价
                    remake: 'test' // 简介
                }
            ],
            dialogTitle: '添加图书',
            bookCategoryOptions,
            dialogFormVisible: false,
            addBookForm: {
                ISBN: '',
                bookName: '', // 书名
                bookCategory: '', // 类别
                bookAuthor: '', // 作者
                bookPress: '', // 出版社
                yearOfPublication: '', // 出版年
                bookPricing: '', // 定价
                remake: '' // 简介
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
            console.log(val)
        },
        addBook () { // 添加图书
            this.dialogTitle = '添加图书'
            this.dialogFormVisible = true
            console.log('addBook')
        },
        bookEdit (item) {
            this.dialogTitle = '编辑图书'
            this.addBookForm = { ...item }
            this.dialogFormVisible = true
            console.log(item)
        },
        resetForm () { // 取消按钮
            this.dialogFormVisible = false
            this.$refs['addBookForm'].resetFields()
        },
        submitForm () {
            this.$refs['addBookForm'].validate((valid) => {
                if (valid) {
                    alert('submit!')
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
        filterBy (bookArr, value) {
            return bookArr.filter(book => {
                return book.bookName.match(value)
            })
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
</style>
