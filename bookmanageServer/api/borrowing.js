const Router = require("koa-router");
const router = new Router();

const Borrowing = require("../mongoSchema/borrowingSchema");

/**
 * 借阅接口
 * @route POST /borrowings/borrowingAdd
 * @description 注册接口地址  http://127.0.0.1:5000/borrowings/borrowingAdd
 * @access 接口不是公开的 需要token
 */
router.post('/borrowingAdd', async ctx => {
    const findISBNResult = await Borrowing.find({ ISBN: ctx.request.body.ISBN });
    if (findISBNResult.length > 0) { // 说明重复
        return (
            ctx.state = 500,
            ctx.body = {
                success: false,
                sysErrDesc: '本书已被借出!', // 错误信息
                data: '' // 数据
            }
        );
    } else {
        const newBorrowing = new Borrowing({
            name: ctx.request.body.name,
            nameId: ctx.request.body.nameId,
            ISBN: ctx.request.body.ISBN,
            bookName: ctx.request.body.bookName,
            bookCategory: ctx.request.body.bookCategory,
            bookAuthor: ctx.request.body.bookAuthor,
            bookPress: ctx.request.body.bookPress,
            yearOfPublication: ctx.request.body.yearOfPublication,
            bookPricing: ctx.request.body.bookPricing,
            borrowingDate: ctx.request.body.borrowingDate,
            returnDate: ctx.request.body.returnDate,
            Operator: ctx.request.body.Operator,
        });
        // 存储到数据库
        await newBorrowing.save()
            .then(borrowing => {
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
 * 查询归还图书接口
 * @route POST /borrowings/search
 * @description 注册接口地址  http://127.0.0.1:5000/borrowings/search
 * @access 接口不是公开的 需要token
 */
router.post('/search', async ctx => {
    const borrowingName = ctx.request.body.name; // 根据借阅人名字进行查询
    let pageSize = ctx.request.body.pageSize // pageSize 每页显示多少条
    let pageNum = parseInt(ctx.request.body.pageNum) // pageNum = 第几页
    let total = await Borrowing.countDocuments() // 总数
    if (!borrowingName) {
        await Borrowing.find({}).limit(pageSize).skip((pageNum - 1) * pageSize)
            .then(borrowing => {
                return ( 
                    ctx.state = 200,
                    ctx.body = {
                        success: true,
                        sysErrDesc: "",
                        data: borrowing,
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
        await Borrowing.find({borrowingName: borrowingName}).limit(pageSize).skip((pageNum - 1) * pageSize)
            .then(borrowing => {
                ctx.state = 200;
                ctx.body = {
                    success: true,
                    sysErrDesc: "",
                    data: borrowing
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
 * 借阅人归还接口
 * @route POST /borrowings/borrowDelete
 * @description 注册接口地址  http://127.0.0.1:5000/borrowings/borrowDelete
 * @access 接口不是公开的 需要token
 */
router.post('/borrowDelete', async ctx => {
    await Borrowing.deleteOne({ISBN: ctx.request.body.ISBN})
        .then(borrowing => {
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
