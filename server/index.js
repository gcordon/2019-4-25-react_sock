const userRouter = require('./user')
const express = require('express')
const cookieParse = require('cookie-parser')
const bodyParser = require('body-parser')

const model = require('./model')
const Chat = model.getModel('chat')

const app = express()
// socket.io
const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', function(server) {
    // console.log('链接后端socket.io成功')
    server.on('sendmsg', function(data) {
        // 写入消息数据库中
        const {from, to, msg} = data
        const chatid = [from, to].sort().join('_')
        Chat.create({ chatid, from, to, content:msg,}, function(err, doc) {
            console.log(doc._doc)
            // 广播消息（）
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
})

app.use(cookieParse())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, () => {
    console.log('后台链接成功: localhost:9093')
})