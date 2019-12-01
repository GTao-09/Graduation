const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localDate = () => {
    const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
}

// 实例化数据模板
const BookSchema = new Schema({
    ISBN: {
        type: String,
        required: true
    },
    bookName: { // 书名
        type: String,
        required: true
    },
    bookCategory: { // 类别
        type: String,
        required: true
    },
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
    remake: { // 简介
        type: String
    },
    date: {
        type: Date,
        default: localDate()
    }
});

module.exports = Book = mongoose.model('books', BookSchema);