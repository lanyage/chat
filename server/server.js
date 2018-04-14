const express = require('express') //express服务器

const bodyParser = require('body-parser')//用来接收post请求的参数
const cookieParser = require('cookie-parser')//用来获取cookie数据
const userRouter = require('./user')//引入子路由

const app = express()//生成监听器
app.use(cookieParser())//使用cookieparser
app.use(bodyParser.json())//使用bodyparser
app.use('/user', userRouter)//使用子路由


app.listen(9093, function() {
    console.log('Node server start at port 9093')
})//开始监听端口