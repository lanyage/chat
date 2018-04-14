import React from "react"
import { withRouter } from "react-router-dom"
import axios from "axios";
import {loadData} from '../redux/user.redux'
import {connect} from 'react-redux' 
@connect(
    null,
    { loadData }
)
@withRouter//withRouter是方便获取当前页面的url,若该组建是路由组建,则不需要withRouter
class Auth extends React.Component {
    componentDidMount() {
        console.log('Auth mounted!')
        const publicList = ['/login', '/register']
        const pathname = this.props.location.pathname
        if(publicList.indexOf(pathname) > -1){
            return null
        }//如果是在登陆页或者是在注册页,就不需要根据cookie userid查找用户信息

        axios.get('/user/info')
            .then(res=>{
                if(res.status === 200) {
                    if(res.data.code === 0) {
                        //有登录信息的
                        this.props.loadData(res.data.data)//有信息的话就要一直加载并携带用户信息
                    }else {
                        this.props.history.push('/login')
                    }
                }
            })
    }
    render() {
        return null
    }
}

export default Auth