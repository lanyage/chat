const mongoose = require('mongoose') //服务端引入mogoose
const DB_URL = 'mongodb://127.0.0.1:27017/chat'//数据库地址
mongoose.connect(DB_URL)//连接地址
mongoose.connection.on('connected', function () {
    console.log('mongodb connected!')
})//连接成功就打印


const models = {
    user: {
        'username': { type: String, require: true },//用户名
        'password': { type: String, require: true },// 密码
        'type': { type: String, require: true },//类型,牛人还是boss
        'avatar': { type: String },//头像
        'desc': { type: String },//个人简介
        'title': { type: String }, //职位名
        'company': { type: String }, //招聘公司
        'money': { type: String }//薪资
    },
    chat: {
        'chatid': { 'type': String, },
        'from': { 'type': String, 'require': true },//发起人
        'to': { 'type': String, 'require': true },//接受人
        'content': { 'type': String, 'require': true, 'default': '' },
        'createtime': { 'type': Number, 'default': new Date().getTime() },//创建时间 
        'read': { 'type': Boolean, 'default': false }
    }
}//定义数据模型


for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))//
}//创建数据库的表,形式为键值对


module.exports = {
    getModel: function (name) {
        return mongoose.model(name) //根据键获取模型
    }
}//导出模型接口