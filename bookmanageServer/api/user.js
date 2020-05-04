const Router = require("koa-router");
const router = new Router();

const bcrypt = require("bcrypt"); // 加密
const jwt = require("jsonwebtoken"); // token
const { secret } = require("../util/secret")

const User = require("../mongoSchema/userSchema");

// 密码加密
const enbcrypt = async password => {
    let salt = await bcrypt.genSaltSync(10);
    return await bcrypt.hashSync(password, salt);
};
// 解密
const validate = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
};
const localDate = () => {
	const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d.getTime();
}

/**
 * @route POST /users/register
 * @description 注册接口地址  http://127.0.0.1:5000/users/register
 * @access 接口不是公开的 需要token
 */
router.post('/register', async ctx => {
    const findNameResult = await User.find({ name: ctx.request.body.name });
    if (findNameResult.length > 0) { // 说明重复
        return (
            ctx.state = 500,
            ctx.body = {
                success: false,
                sysErrDesc: '名称重复!', // 错误信息
                data: '' // 数据
            }
        );
    } else { // 没重复
        const newUser = new User({
            userName: ctx.request.body.userName,
            name: ctx.request.body.name,
            password: await enbcrypt(ctx.request.body.password),
            identify: ctx.request.body.identify,
            gender: ctx.request.body.gender,
            age: ctx.request.body.age,
            entryTime: ctx.request.body.entryTime,
            birthday: ctx.request.body.birthday,
            subordinateDepart: ctx.request.body.subordinateDepart,
            tel: ctx.request.body.tel
        });
        // 存储到数据库
        await newUser.save()
            .then(user => {
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
 * @route POST /users/login
 * @description 登陆接口地址 http://127.0.0.1:5000/users/login
 * @access 接口是公开的
 */
router.post('/login', async ctx => {
    const name = ctx.request.body.name;
    const password = ctx.request.body.password;
    await User.findOne({ name }).then(user => {
        // console.log(user)
        if (!user) {
            return (
                ctx.state = 404,
                ctx.body = {
                    success: false,
                    sysErrDesc: '请查看用户名或密码是否正确', // 错误信息
                    data: '' // 数据
                }
            );
        }
        validate(password, user.password).then(res => {
            if (res) {
                // token
                // jwt.sign("规则","加密名字","过期时间","箭头函数")
                const rule = {
                    id: user._id,
                    name: user.name,
                    identify: user.identify,
                    time: localDate(), // 当前登录的时间
                    timeout: 2*60*60*1000 // 过期时间2小时
                }
                // 加token
                // {expiresIn: 3600000} 过期时间一小时
                let token = jwt.sign(rule, secret, {expiresIn: '2h'});
                return (
                    ctx.state = 200,
                    ctx.body = {
                        success: true,
                        sysErrDesc: '', // 错误信息
                        data: {
                            'token': token,
                            'name': user.name,
                            'identify': user.identify,
                        }
                    }
                );
            }
            throw new Error();
        }).catch(error => {
            ctx.state = 500,
            ctx.body = {
                success: false,
                sysErrDesc: '请查看用户名或密码是否正确', // 错误信息
                data: '', // 数据
                sysError: error
            };
        })
    }).catch(error => {
            ctx.state = 500,
            ctx.body = {
                success: false,
                sysErrDesc: '请查看用户名或密码是否正确', // 错误信息
                data: '', // 数据
                sysError: error
            };
        })
});

/**
 * 用户信息查询接口
 * @route POST /users/search
 * @description 注册接口地址  http://127.0.0.1:5000/users/search
 * @access 接口不是公开的 需要token
 */
router.post('/search', async ctx => {
    const Username = ctx.request.body.name;
    const type = ctx.request.body.type || 0;
    let pageSize = ctx.request.body.pageSize // pageSize 每页显示多少条
    let pageNum = parseInt(ctx.request.body.pageNum) // pageNum = 第几页
    let total = await User.countDocuments() // 总数
    if (!Username) {
        await User.find({}).limit(pageSize).skip((pageNum - 1) * pageSize)
            .then(user => {
                return ( 
                    ctx.state = 200,
                    ctx.body = {
                        success: true,
                        sysErrDesc: "",
                        data: user,
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
        // const reg = new RegExp(Username,'i');//不区分大小写
        const searchName = type ? Username : {$regex: Username}
        await User.find({name: searchName}).limit(pageSize).skip((pageNum - 1) * pageSize)
        .then(user => {
            ctx.state = 200;
            ctx.body = {
                success: true,
                sysErrDesc: "",
                data: user
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
        // await User.find({name:{$regex:Username}}).limit(pageSize).skip((pageNum - 1) * pageSize)
        //     .then(user => {
        //         ctx.state = 200;
        //         ctx.body = {
        //             success: true,
        //             sysErrDesc: "",
        //             data: user
        //         };
        //     })
        //     .catch(error => {
        //         // console.log(error);
        //         ctx.state = 500;
        //         ctx.body = {
        //             success: false,
        //             sysErrDesc: '未找到!', // 错误信息
        //             data: '', // 数据
        //             sysError: error
        //         };
        //     })
    }
});

/**
 * 用户删除接口
 * @route POST /users/userDelete
 * @description 注册接口地址  http://127.0.0.1:5000/users/userDelete
 * @access 接口不是公开的 需要token
 */
router.post('/userDelete', async ctx => {
    await User.deleteOne({name: ctx.request.body.name})
        .then(user => {
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