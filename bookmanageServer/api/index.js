const Router = require('koa-router');
const users = require('./user');
const books = require("./book");

const router = Router();

router.use('/api/users', users.routes(), users.allowedMethods());
router.use('/api/books', books.routes(), books.allowedMethods());

module.exports = router;