const Router = require("koa-router");
const router = new Router();

const Book = require("../mongoSchema/bookSchema");

/**
 * 图书添加编辑接口
 * @route POST api/books/addEdit
 * @description 注册接口地址  http://localhost:8060/api/books/addEdit
 * @access 接口不是公开的 需要token
 */
router.post('/addEdit', async ctx => {
    const newBook = new Book({
        bookName: ctx.request.body.bookName,
        bookType: ctx.request.body.bookType
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
 * 图书根据bookType来查询接口
 * @route POST api/books/search
 * @description 注册接口地址  http://localhost:8060/api/books/search
 * @access 接口不是公开的 需要token
 */
router.post('/search', async ctx => {
    const bookType = ctx.request.body.bookType;
    if (!bookType) {
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
        await Book.find({bookType})
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