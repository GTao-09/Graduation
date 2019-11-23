const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localDate = () => {
    const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
}

// 实例化数据模板
const BookSchema = new Schema({
    bookName: { // 书名
        type: String,
        required: true
    },
    bookType: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: localDate()
    }
});

module.exports = Book = mongoose.model('books', BookSchema);