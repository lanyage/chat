import React from 'react'

import { NavBar, InputItem, TextareaItem, Button } from "antd-mobile"
import AvatarSelector from '../component/avatarselector'
import { connect } from 'react-redux'
import { update } from '../redux/user.redux'
import { Redirect } from 'react-router-dom'
@connect(
    state => state.user,
    { update }
)
class BossInfo extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            desc: '',
            company: '',
            money: ''
        }
    }

    render() {
        // console.log(this.state)
        const pathname = this.props.location.pathname
        const redirectTo = this.props.redirectTo
        return (
            <div>
                {redirectTo && redirectTo !== pathname ? <Redirect to={this.props.redirectTo} /> : null}
                <NavBar mode='dark'>BOSS完善信息</NavBar>
                <AvatarSelector selectAvatar={imgname => {
                    this.setState({ avatar: imgname })
                }}>
                </AvatarSelector>
                <InputItem onChange={v => { this.setState({ 'title': v }) }}>招聘职位</InputItem>
                <InputItem onChange={v => { this.setState({ 'company': v }) }}>公司名称</InputItem>
                <InputItem onChange={v => { this.setState({ 'money': v }) }}>职位薪资</InputItem>
                <TextareaItem
                    rows={3}
                    autoHeight
                    title='职业要求'
                    onChange={v => { this.setState({ 'desc': v }) }}>
                </TextareaItem>
                <Button
                    onClick={() => { this.props.update(this.state) }}
                    type='primary'>保存</Button>
            </div>
        )
    }
}
export default BossInfo