const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/imooc_chat');

const model = {
    "user": {
        "user": { type: String, require: true },
        "pwd": { type: String, require: true },
        "type": {type: String, require: true},
        // 头像
        "avatar": { type: String, },
        // 个人简介或者职位简介
        "desc": {type:String},
        // 职位名
        "title": { type: String },
        // 如果你是boss 还有俩个字段
        // 公司
        "company": { type: String },
        // 工资
        "money": {type: String},
    },
    "chat": {
        // 俩个用户id的组合id =》  便于从数据库中拿取数据
        "chatid": { type: String, require: true },
        // 发送者
        "from": { type: String, require: true },
        // 接收者
        "to": { type: String, require: true },
        // 是否已阅读此条消息
        "read": {type: Boolean, default: false},
        // 内容
        "content": { type: String, require: true },
        // 发送时间
        "create_time": { type: String, default: new Date().getTime() },
    }
}
for (let m in model) {
    mongoose.model(m, new mongoose.Schema(model[m]))
}

module.exports = {
    getModel : function(name) {
        return mongoose.model(name)
    }
}
