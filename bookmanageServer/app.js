const koa = require("koa");
const Router = require("koa-router");
const mongoose = require("mongoose");

const app = new koa();
const router = new Router();

const db = "mongodb://localhost:27019/graduation";
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => { console.log('MongoDB Connected') })
    .catch(error => console.log(error))

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}, http://127.0.0.1:${port}`);
});