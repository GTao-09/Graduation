const Router = require("koa-router");
const router = new Router();

const Book = require("../mongoSchema/bookSchema");

/**
 * 图书添加编辑接口
 * @route POST /books/addEdit
 * @description 注册接口地址  http://127.0.0.1:8060/books/addEdit
 * @access 接口不是公开的 需要token
 */
router.post('/addEdit', async ctx => {
    const newBook = new Book({
        ISBN: ctx.request.body.ISBN,
        bookName: ctx.request.body.bookName,
        bookCategory: ctx.request.body.bookCategory,
        bookAuthor: ctx.request.body.bookAuthor,
        bookPress: ctx.request.body.bookPress,
        yearOfPublication: ctx.request.body.yearOfPublication,
        bookPricing: ctx.request.body.bookPricing,
        remake: ctx.request.body.remake
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
});

/**
 * 图书根据bookCategory(类别)来查询接口
 * @route POST api/books/search
 * @description 注册接口地址  http://127.0.0.1:8060/books/search
 * @access 接口不是公开的 需要token
 */
router.post('/search', async ctx => {
    const bookCategory = ctx.request.body.bookCategory;
    if (!bookCategory) {
        await Book.find({})
            .then(book => {
                return ( 
                    ctx.state = 200,
                    ctx.body = {
                        success: true,
                        sysErrDesc: "",
                        data: book
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
        await Book.find({bookCategory})
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

module.exports = router;