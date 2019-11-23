const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localDate = () => {
    const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
}

// 实例化数据模板
const UserSchema = new Schema({
    name: { // 名字
        type: String,
        required: true
    },
    password: { // 密码
        type: String,
        required: true
    },
    identify: { // 身份
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: localDate()
    }
});

module.exports = User = mongoose.model('users', UserSchema);