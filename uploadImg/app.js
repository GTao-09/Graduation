// https://www.jianshu.com/p/2986507f14a3

const koa = require("koa");
const Router = require("koa-router");
const cors = require('koa2-cors'); // 解决跨域问题

// const multer=require('koa-multer'); // 文件上传中间件

// ------------------
const upload = require("./api/uploadApi.js");

const app = new koa();
const router = new Router();

// 设置跨域访问
app.use(cors({
    origin: function (ctx) {
        if (ctx.url === '/test') {
            return "*"; // 允许来自所有域名请求
        }
        return 'http://192.168.1.7:8080';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// // 上传 图片
// let storage = multer.diskStorage({
//     // 文件保存路径
//     destination: function(req, file, cb) {
//         // cb(null, 'public/uploads/')
//         cb(null, 'public/')
//     },
//     // 修改文件名称
//     filename: function(req, file, cb) {
//         let fileFormat = (file.originalname).split(".");
//         cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
//     }
// })
// //加载配置
// let upload = multer({
//     storage: storage
// });
// router.post('/upload', upload.single('file'), async (ctx) => {
//     ctx.body = {
//         filename: 'http://127.0.0.1:5000/' + ctx.req.file.filename //返回文件名
//     }
// })

// router.get("/", async ctx => {
//     ctx.body = {
//         data: "test"
//     }
// })

// --------------------
router.use(upload.routes(), upload.allowedMethods());

app.use(router.routes());
app.use(require('koa-static')(__dirname + '/public')); // 设置静态文件夹来使浏览器可以访问

const port = process.env.PORT || 5009;
app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://127.0.0.1:${port}`);
});