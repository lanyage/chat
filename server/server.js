const express = require('express') //express服务器
const bodyParser = require('body-parser')//用来接收post请求的参数
const cookieParser = require('cookie-parser')//用来获取cookie数据
const model = require('./model') //引入实体模型
const Chat = model.getModel('chat') //通过实体模型获取聊天记录的模型

const app = express()//生成监听器

//work with express
const server = require('http').Server(app)
const io = require('socket.io')(server)

/** 监听websocket的连接 */
io.on('connection', function(socket) {
    // console.log('user login!!!')
    /** 通过sendmsg来接受客户端发送的信息 */
    socket.on('sendmsg', function(data) {
        
        const {from, to, msg} = data
        /** 这里根据用户的信息来生成聊天记录的id,生成的方式就是通过将两个用户的id排序然后链接起来 */
        const chatid = [from,to].sort().join('_')
        /** 通过create来保存信息 */
        Chat.create({chatid,from,to,content:msg}, function(e, d) {
            /** 存完之后就给所有的人广播recvmsg,通过Object.assign方法来处理数据 */
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