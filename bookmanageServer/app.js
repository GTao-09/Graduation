const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser");
const cors = require('koa2-cors'); // 解决跨域问题

const userSchema = require("./mongoSchema/userSchema");

// 用于初始时加密
const bcrypt = require("bcrypt"); // 加密
const enbcrypt = password => {
    let salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
};

const app = new koa();
app.use(bodyParser());
const router = new Router();

const routes = require("./api/index");
const check = require("./util/check");

const db = "mongodb://localhost:27019/graduation";
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // 最后加上
        // let data = {name: 'admin', password: enbcrypt('123456'), identify: '1'};
        // userSchema.create(data, (error, data) => {
        //     if (error) throw error;
        //     console.log(data)
        // })
        console.log('MongoDB Connected')
    })
    .catch(error => console.log(error))

//设置跨域访问
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://192.168.0.102:8080'; // 这样就能只允许 http://192.168.0.112:8080 这个域名的请求了
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))
app.use(check);
app.use(routes.routes(), routes.allowedMethods())

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://127.0.0.1:${port}`);
});