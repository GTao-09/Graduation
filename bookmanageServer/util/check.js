// 检测token
const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const verify = Promise.promisify(jwt.verify);
const { secret } = require('./secret');

const localDate = () => {
	const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	return d.getTime();
}

const check = async (ctx, next) => {
    const url = ctx.request.url;
    // 登录 不用检测 || url === '/users/register'
    if (url === '/users/login') await next();
    else {
        // 规定token写在header的 'authorization'  前端返回的token
        const frontToken = ctx.request.headers['authorization'];
        if (!frontToken) {
            return (
                ctx.state = 5001,
                ctx.body = {
                    success: false,
                    sysErrDesc: '请重新登录1', // 错误信息
                    data: '' // 数据
                }
            );
        }
        // 解token
        const tokenParts = frontToken.split(' ');
        const token = tokenParts[1]; // 取出token
        try {
            // 判断是否过期
            const payload = await verify(token, secret)
            const { time, timeout } = payload
            const dateNow = localDate();
            const dateTime = new Date(time).getTime();
            if (dateNow - dateTime <= timeout) {
                // 未过期
                await next();
            } else {
                // 过期
                return (
                    ctx.state = 401,
                    ctx.body = {
                        success: false,
                        sysErrDesc: 'token过期', // 错误信息
                        data: '' // 数据
                    }
                );
            }
        } catch (error) {
            return (
                ctx.state = 5001,
                ctx.body = {
                    success: false,
                    sysErrDesc: '请重新登录', // 错误信息
                    sysError: error // 数据
                }
            )
        }
    }
}

module.exports = check;