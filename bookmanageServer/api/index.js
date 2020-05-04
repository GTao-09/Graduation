const Router = require('koa-router');
const users = require('./user');
const books = require("./book");
const borrowings = require("./borrowing");

const router = Router();

router.use('/users', users.routes(), users.allowedMethods());
router.use('/books', books.routes(), books.allowedMethods());
router.use('/borrowings', borrowings.routes(), borrowings.allowedMethods());

module.exports = router;