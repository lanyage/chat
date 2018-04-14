import React from "react"
import Logo from "../component/logo/logo";
import { List, InputItem, Radio, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import onContentChange from "../component/onchange/onchange";
import { connect } from 'react-redux'
import { register } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    { register }
)
@onContentChange
class Register extends React.Component {

    componentDidMount() {
        this.props.handleChange('type', 'genius') //给定初始值
    }

    render() {
        const RadioItem = Radio.RadioItem
        const pathname = this.props.location.pathname
        const redirectTo = this.props.redirectTo
        return (
            <div>
                {redirectTo && redirectTo !== pathname ? <Redirect to={redirectTo} /> : null}
                {/* 如果成功了就会有redirectTo那么就在渲染之前进行跳转 */}
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    <List>
                        <WhiteSpace />
                        <InputItem onChange={v => { this.props.handleChange('username', v) }}>用户</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={v => { this.props.handleChange('password', v) }}>密码</InputItem>
                        <WhiteSpace />
                        <InputItem type='password' onChange={v => { this.props.handleChange('repeatpsw', v) }}>确认密码</InputItem>
                        <WhiteSpace />
                        <RadioItem
                            checked={this.props.state.type === 'genius'}
                            onChange={() => { this.props.handleChange('type', 'genius') }}>牛人</RadioItem>
                        <WhiteSpace />
                        <RadioItem
                            checked={this.props.state.type === 'boss'}
                            onChange={() => { this.props.handleChange('type', 'boss') }}>BOSS</RadioItem>
                        <WhiteSpace />
                        <Button
                            type='primary'
                            onClick={() => { this.props.register(this.props.state) }}>注册</Button>
                    </List>
                </WingBlank>
            </div>
        )
    }
}
export default Register