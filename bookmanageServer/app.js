const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");
const bodyParser = require("koa-bodyparser")

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
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => {
        // 最后加上
        // let data = {name: 'admin', password: enbcrypt('123456'), identify: 'admin'};
        // userSchema.create(data, (error, data) => {
        //     if (error) throw error;
        //     console.log(data)
        // })
        console.log('MongoDB Connected')
    })
    .catch(error => console.log(error))

app.use(check);
app.use(routes.routes(), routes.allowedMethods())

const port = process.env.PORT || 8060;
app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://127.0.0.1:${port}`);
});