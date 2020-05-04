const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localDate = () => {
    const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
}

// 实例化数据模板
// 借阅日期、归还日期、罚金、操作人
const BorrowingSchema = new Schema({
    name: { // 借阅人
        type: String,
        required: true
    },
    nameId: { // 借阅人编号
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true
    },
    bookName: { // 书名
        type: String,
        required: true
    },
    /* bookCategory: { // 类别
        type: String,
        required: true
    }, */
    bookAuthor: { // 作者
        type: String,
        required: true
    },
    bookPress: { // 出版社
        type: String,
        required: true
    },
    yearOfPublication: { // 出版年
        type: String,
        required: true
    },
    bookPricing: { // 定价
        type: Number
    },
    borrowingDate: { // 借阅日期
        type: String,
        required: true
    },
    returnDate: { // 归还日期
        type: String,
        required: true
    },
    /* fine: { // 罚金
        type: Number
    }, */
    Operator: { // 操作人
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: localDate()
    }
});

module.exports = Borrowing = mongoose.model('borrowings', BorrowingSchema);