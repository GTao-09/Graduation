const Router = require("koa-router");

const multer=require('koa-multer'); // 文件上传中间件
const router = new Router();

// 上传 图片
let storage = multer.diskStorage({
    // 文件保存路径
    destination: function(req, file, cb) {
        // cb(null, 'public/uploads/')
        cb(null, 'public/')
    },
    // 修改文件名称
    filename: function(req, file, cb) {
        let fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})
//加载配置
let upload = multer({
    storage: storage
});
router.post('/upload', upload.single('file'), async (ctx) => {
    ctx.body = {
        filename: 'http://127.0.0.1:5009/' + ctx.req.file.filename //返回文件名 http://127.0.0.1:5000/  后端启动的host
    }
})

module.exports = router;
