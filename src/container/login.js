import React from "react"
import Logo from '../component/logo/logo'
import { WingBlank, WhiteSpace, InputItem, List, Button } from 'antd-mobile'
import onContentChange from '../component/onchange/onchange'
import { connect } from 'react-redux'
import { login } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    { login }
)
@onContentChange  //其实也就是返回一个新的Login组件
class Login extends React.Component {
    constructor(props) {
        super(props)
        this.register = this.register.bind(this)
    }
    register() {
        this.props.history.push('/register')
    }
    render() {    
        const pathname = this.props.location.pathname
        const redirectTo = this.props.redirectTo  
        return (
            <div>
                {redirectTo && redirectTo !== pathname ? <Redirect to={redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        {/* 固定写法 v代码当前标签的value */}
                        <InputItem onChange={v => { this.props.handleChange('username', v) }}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={v => { this.props.handleChange('password', v) }}>密码</InputItem>
                        <WhiteSpace />
                        <Button onClick={() => { this.props.login(this.props.state) }} type='primary'>登录</Button>
                        <WhiteSpace />
                        <Button onClick={this.register} type='primary'>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Login