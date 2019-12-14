const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localDate = () => {
    const d = new Date(Date.now());
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d;
}

// 实例化数据模板
const UserSchema = new Schema({
    userName: { // 用户真实姓名
        type: String,
        required: true
    },
    name: { // 用户名 name
        type: String,
        required: true
    },
    password: { // 密码 password
        type: String,
        required: true
    },
    identify: { // 身份 identify 0 普通用户 1 管理员
        type: String,
        required: true
    },
    gender: { // 性别 gender 0 女 1 男
        type: String
    },
    age: { // 年龄 age
        type: Number
    },
    entryTime: { // 入职时间 entryTime
        type: String
    },
    birthday: { // 出生年月 birthday
        type: String
    },
    tel: { // 电话
        type: String
    },
    subordinateDepart: { // 所属部门 subordinateDepart
        type: String
    },
    date: { // 创建时间
        type: Date,
        default: localDate()
    }
});

module.exports = User = mongoose.model('users', UserSchema);