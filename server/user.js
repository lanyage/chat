/** 这个就是后端的持久层,通过模型去获取数据库中的数据,相当于是mvc中的controller层*/
const express = require('express')//express为后端框架
const utils = require('utility')//用来生成md5值的密码
const Router = express.Router()//生成express子路由


const model = require('./model')//获取数据库模型
const User = model.getModel('user')//获取对应的表模型
const Chat = model.getModel('chat')//获取聊天信息的模型

const _filter = { 'password': 0, '__v': 0 }//设置返回数据的过滤器,这样的话就不会将password暴露在外面

/** 清除所有的聊天记录 */
// Chat.remove({},function(e,d){})
/** 清除所有的用户信息 */
// User.remove({},function(e,d){})

/** 获取用户的列表 */
Router.get('/list', function (req, res) {
    //通过这样获取get请求中的参数
    const { type } = req.query
    // User.remove({}, function(e,d){})
    User.find({ type: type }, function (err, doc) {
        return res.json({ code: 0, data: doc })
    })//按照类型查找
})//配置user的子路由,监听这个/user/list请求

/** 用户注册的功能,此处的话要对用户的信息进行验证,返回code和msg或code和data */
Router.post('/register', function (req, res) {
    /** 通过body-parser来获取body里面的参数 */
    const { username, password, type } = req.body

    User.findOne({ username }, function (e, d) {
        if (d) {
            return res.json({ code: 1, msg: '用户名重复' })
        }
        /** 此处的话必须给密码进行加密,这里用的是md5加盐值 */
        const userModel = new User({ username, password: md5Psw(password), type })
        userModel.save(function (e, d) {
            if (e) {
                return res.json({ code: 1, msg: '后端出错了' })
            }
            const { username, type, _id } = d
            res.cookie('userid', _id)
            return res.json({ code: 0, data: { username, type, _id } })
        })
    })
})//用户注册逻辑

/** 获取当前用的信息 */
Router.get('/info', function (req, res) {
    /** 这是当前cookie中的用户的id,此处的话应该引入cookie-parser */
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1 })
    }
    /** 通过_id去查找用户的信息, 参数2是查找时候的过滤器,可以过滤到不想显示的字段  */
    User.findOne({ _id: userid }, _filter, function (e, d) {
        if (e)
            return res.json({ code: 1, msg: '后端出错了' })
        if (d) {
            return res.json({ code: 0, data: d })
        }
    })
})//每次页面渲染的时候都会检测用户的登录状态


Router.post('/update', function (req, res) {
    const { userid } = req.cookies
    if (!userid) {
        return res.json({ code: 1, msg: '登录状态已经不再' })
    }
    User.findByIdAndUpdate(userid, req.body, function (e, d) {
        const data = Object.assign({}, { username: d.username, type: d.type }, req.body)
        return res.json({ code: 0, data: data })
    })
})//用户完善信息


Router.post('/login', function (req, res) {
    const { username, password } = req.body
    User.findOne({ username, password: md5Psw(password) }, function (e, d) {
        if (!d) {
            return res.json({ code: 1, msg: '用户名密码错误' })
        }
        res.cookie('userid', d._id)
        return res.json({ code: 0, data: d })
    })
})

Router.get('/getmsglist', function (req, res) {
    const userid = req.cookies.userid
    User.find({}, function (e, d) {
        let users = {}
        d.forEach(v => {
            users[v._id] = { name: v.username, avatar: v.avatar }
        })
        Chat.find({ '$or': [{ from: userid }, { to: userid }] }, function (e, d) {
            if (!e) {
                return res.json({ code: 0, msgs: d, users: users })
            }
        })
    })
})

function md5Psw(password) {
    const salt = 'dakhfohqoafoajfalmLF2424@#$25dfslege'
    return utils.md5(utils.md5(salt + password))
}


module.exports = Router//导出子路由