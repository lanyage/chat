import React from "react"
import { withRouter } from "react-router-dom" //如果不是路由组件,那么需要withRouter来获取全局的props
import axios from "axios" //用于跨域请求后端数据
import {loadData} from '../redux/user.redux' //reducer
import {connect} from 'react-redux' //获取connect,用于获取redux里面的状态和函数
@connect(
    null,//因为此处不需要redux的状态,因为可以使用null
    { loadData } //获取redux中的loadData这么一个actionCreator
)

@withRouter//withRouter是方便获取当前页面的url,若该组建是路由组建,则不需要withRouter
class Auth extends React.Component {

    // 在页面加载完成之后会去验证用户信息,如果是在登录页或注册页,用户信息不存在的时候,不需要验证,其它页面都需要验证,仅仅当页面刷新的时候会
    componentDidMount() {
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname //获取当前页面的pathname 如/login
        if(publicList.indexOf(pathname) > -1){
            return null
        }//如果是在登陆页或者是在注册页,就不需要根据cookie userid查找用户信息
        
        /**
         * 加载登录用户的信息,向这个链接发起请求 "proxy": "http://localhost:9093/user/info" --- package.json
         */
        axios.get('/user/info') //通过axios进行跨域请求
            .then(res=>{ //获取到结果后
                if(res.status === 200) { //如果获取的结果状态是200
                    if(res.data.code === 0) { //如果获取的状态码为0,表示loadData成功
                        //有登录信息的
                        this.props.loadData(res.data.data)//有信息的话就要一直加载并携带用户信息,所谓加载是将信息存储到redux里面
                    }else {
                        this.props.history.push('/login') //通过这个来进行页面的跳转
                    }
                }
            })
    }
    render() {
       
        return null
    }
}

export default Auth