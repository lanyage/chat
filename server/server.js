const express = require('express') //express服务器

const bodyParser = require('body-parser')//用来接收post请求的参数
const cookieParser = require('cookie-parser')//用来获取cookie数据
const model = require('./model')
const Chat = model.getModel('chat')

const app = express()//生成监听器
//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', function(socket) {
    // console.log('user login!!!')
    socket.on('sendmsg', function(data) {
        console.log(data)
        const {from, to, msg} = data
        const chatid = [from,to].sort().join('_')
        Chat.create({chatid,from,to,content:msg}, function(e, d) {
           
            io.emit('recvmsg', Object.assign({}, d._doc))
        })
        // io.emit('recvmsg', data)
    })
})

const userRouter = require('./user')//引入子路由
app.use(cookieParser())//使用cookieparser
app.use(bodyParser.json())//使用bodyparser
app.use('/user', userRouter)//使用子路由


server.listen(9093, function() {
    console.log('Node server start at port 9093')
})//开始监听端口