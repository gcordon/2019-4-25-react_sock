const Router = require('express').Router()
const util = require('utility')
const model = require('./model.js')
const User = model.getModel('user')
const Chat = model.getModel('chat')

// 过滤 (在findOne或create的时候过滤一些不需要帅选出来的东西)
const _filter = { 'pwd': 0, '__v': 0}

// 显示已经注册的用户
Router.get('/list', function(req, res) {
    const {type} = req.query
    if (type) {
        User.find({ type }, function(err, data) {
            if (data) {
                return res.json({ code: 0, data, })
            }
        })
    } else {
        User.find({ }, function (err, data) {
            if (data) {
                return res.json({ code: 0, data, })
            }
        })
    }
})
// 获取聊天消息
Router.get('/msglist', function (req, res) {
    const userid = req.cookies.userid
    // 查询所有的用户（用户消息的显示头像和姓名，后期再优化）
    User.find({}, function(err, userdoc) {
        let users = {}
        userdoc.forEach(v => {
            users[v._id] = {name:v.user, avatar:v.avatar}
        })
        // “$or” 多个条件匹配, 可以嵌套 $in 使用
        // 这里的意思是： 只帅选在Chat数据库中from和to中等于 = cookies里的userid的数据
        Chat.find({"$or":[{from:userid}, {to:userid}]}, function(err, doc) {
            return res.json({code:0, msgs: doc, users})
        })
    })
})
//如果发送者id和当前的id相同的话 ？ 接收者id ： 发送者
// 密码加盐
function md5Pwd(pwd) {
    const salt = util.md5(util.md5(pwd)+'cordon')
    return salt
}
// 用户登录
Router.post('/login', function(req,res) {
    const { user, pwd, } = req.body
    User.findOne({ user, pwd: md5Pwd(pwd), }, _filter, function (err, doc) {
        if (!doc) {
            return res.json({code:1,msg: '账号或密码错误'})
        }
        res.cookie('userid', doc._id)
        return res.json({ code: 0,data:doc,})
    })
})
// 用户注册
Router.post('/register', function (req, res) {
    const {user, pwd, type, } = req.body
    // 判断是否存在用户
    User.findOne({user,}, function(err, doc){
        if (doc) {
            return res.json({code:1,msg:'用户已存在'})
        }
    })
    // 创建用户
    const UserModel = new User({ user, pwd: md5Pwd(pwd), type, }, _filter)
    UserModel.save((err, doc)=> {
        if (err) {
            return res.json({
                code: 1,
                msg: '服务器出错'
            })
        }
        const { user, type, _id } = doc
        res.cookie('userid', _id)
        return res.json({ code: 0, data: { user, type, _id } })
    })

    // User.create({ user, pwd: md5Pwd(pwd), type, }, function(err, doc) {
    //     if (err) {
    //         return res.json({
    //             code: 1,
    //             msg: '服务器出错'
    //         })
    //     }
    //     const { user, type, _id } = doc
    //     res.cookie('userid', _id)
    //     return res.json({ code: 0, doc: { user, type, _id }} )
    // })
})
// 获取用户信息 (前台redux检测，前台检测之后查看需要调用需要的Route地址)
Router.get('/info', function(req, res) {
    const {userid} = req.cookies
    if (!userid) {
        return res.json({code:1})
    }
    User.findOne({ _id: userid }, _filter, function(err, doc) {
        if (err) {
            return res.json({code:1,msg:'服务器出错'})
        }
        return res.json({code:0, data: doc})
    })
})
Router.post('/update', function(req, res) {
    // 检测cookie
    const {userid} = req.cookies
    const data = req.body
    if (!userid) {
        // return res.json({ code: 1, msg: '用户cookie不存在' })
        return res.json({code:1})
    }
    User.findByIdAndUpdate(userid, data, function(err, doc) {
        if (err) {
            return res.json({ code: 1, msg: '服务器出错' })
        }
        // 返回完善的内容和用户信息
        const re = Object.assign({}, {
            user: doc.user,
            type: doc.type,
        }, data)
        console.log('======server update==============================');
        console.log(data);
        console.log('======server update==============================');
        return res.json({code:0, data: re})
    })
})

module.exports = Router