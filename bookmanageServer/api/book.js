const Router = require("koa-router");
const router = new Router();

const Book = require("../mongoSchema/bookSchema");

/**
 * 图书添加接口
 * @route POST /books/bookAdd
 * @description 注册接口地址  http://127.0.0.1:5000/books/bookAdd
 * @access 接口不是公开的 需要token
 */
router.post('/bookAdd', async ctx => {
    const findISBNResult = await Book.find({ ISBN: ctx.request.body.ISBN });
    if (findISBNResult.length > 0) { // 说明重复
        return (
            ctx.state = 500,
            ctx.body = {
                success: false,
                sysErrDesc: 'ISBN重复!', // 错误信息
                data: '' // 数据
            }
        );
    } else {
        const newBook = new Book({
            ISBN: ctx.request.body.ISBN,
            bookName: ctx.request.body.bookName,
            bookCategory: ctx.request.body.bookCategory,
            bookAuthor: ctx.request.body.bookAuthor,
            bookPress: ctx.request.body.bookPress,
            yearOfPublication: ctx.request.body.yearOfPublication,
            bookPricing: ctx.request.body.bookPricing,
            remake: ctx.request.body.remake,
            cover: ctx.request.body.cover
        });
        // 存储到数据库
        await newBook.save()
            .then(book => {
                ctx.state = 200;
                ctx.body = {
                    success: true,
                    sysErrDesc: '', // 错误信息
                    data: '' // 数据
                };
                // console.log(user)
            })
            .catch(error => {
                // console.log(error);
                ctx.state = 500;
                ctx.body = {
                    success: false,
                    sysErrDesc: '未存储到数据库!', // 错误信息
                    data: '', // 数据
                    sysError: error
                };
            })
    }
});

/**
 * 图书查询，也可根据bookCategory(类别)来查询接口
 * @route POST api/books/search
 * @description 注册接口地址  http://127.0.0.1:5000/books/search
 * @access 接口不是公开的 需要token
 */
router.post('/search', async ctx => {
    const bookCategory = ctx.request.body.bookCategory;
    let pageSize = ctx.request.body.pageSize // pageSize 每页显示多少条
    let pageNum = parseInt(ctx.request.body.pageNum) // pageNum = 第几页
    let total = await Book.countDocuments() // 总数
    if (!bookCategory || bookCategory === '0') {
        await Book.find({}).limit(pageSize).skip((pageNum - 1) * pageSize)
            .then(book => {
                return ( 
                    ctx.state = 200,
                    ctx.body = {
                        success: true,
                        sysErrDesc: "",
                        data: book,
                        total: total
                    }
                );
            })
            .catch(error => {
                // console.log(error);
                return (
                    ctx.state = 500,
                    ctx.body = {
                        success: false,
                        sysErrDesc: '未找到!', // 错误信息
                        data: '', // 数据
                        sysError: error
                    }
                );
            })
    } else {
        await Book.find({bookCategory}).limit(pageSize).skip((pageNum - 1) * pageSize)
            .then(book => {
                ctx.state = 200;
                ctx.body = {
                    success: true,
                    sysErrDesc: "",
                    data: book
                };
            })
            .catch(error => {
                // console.log(error);
                ctx.state = 500;
                ctx.body = {
                    success: false,
                    sysErrDesc: '未找到!', // 错误信息
                    data: '', // 数据
                    sysError: error
                };
            })
    }
});

/**
 * 图书编辑接口
 * @route POST /books/bookEdit
 * @description 注册接口地址  http://127.0.0.1:5000/books/bookEdit
 * @access 接口不是公开的 需要token
 */
router.post('/bookEdit', async ctx => {
    await Book.updateOne({ISBN: ctx.request.body.ISBN}, {
        $set: {
            ISBN: ctx.request.body.ISBN,
            bookName: ctx.request.body.bookName,
            bookCategory: ctx.request.body.bookCategory,
            bookAuthor: ctx.request.body.bookAuthor,
            bookPress: ctx.request.body.bookPress,
            yearOfPublication: ctx.request.body.yearOfPublication,
            bookPricing: ctx.request.body.bookPricing,
            remake: ctx.request.body.remake,
            cover: ctx.request.body.cover
        }
    })
        .then(book => {
            ctx.state = 200;
            ctx.body = {
                success: true,
                sysErrDesc: '', // 错误信息
                data: '' // 数据
            };
            // console.log(user)
        })
        .catch(error => {
            // console.log(error);
            ctx.state = 500;
            ctx.body = {
                success: false,
                sysErrDesc: '编辑失败!', // 错误信息
                data: '', // 数据
                sysError: error
            };
        })
});

/**
 * 图书删除接口
 * @route POST /books/bookDelete
 * @description 注册接口地址  http://127.0.0.1:5000/books/bookDelete
 * @access 接口不是公开的 需要token
 */
router.post('/bookDelete', async ctx => {
    await Book.deleteOne({ISBN: ctx.request.body.ISBN})
        .then(book => {
            ctx.state = 200;
            ctx.body = {
                success: true,
                sysErrDesc: '', // 错误信息
                data: '' // 数据
            };
            // console.log(user)
        })
        .catch(error => {
            // console.log(error);
            ctx.state = 500;
            ctx.body = {
                success: false,
                sysErrDesc: '删除失败!', // 错误信息
                data: '', // 数据
                sysError: error
            };
        })
});

module.exports = router;