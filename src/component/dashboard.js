import React from "react"
import { NavBar } from 'antd-mobile'
import { Switch, Route } from "react-router-dom";
import {connect} from 'react-redux'
import NavLinkBar from '../component/navlinkbar'

function Boss() {
    return (
        <div>牛人列表</div>
    )
}
function Genius() {
    return (
        <div>BOSS列表</div>
    )
}
function Msg() {
    return (
        <div>Msg</div>
    )
}
function User() {
    return (
        <div>User</div>
    )
}
@connect(
    state => state.user
)
class DashBoard extends React.Component {

    render() {
        const pathname = this.props.location.pathname
        const user = this.props
        const navList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type === 'genius'
            },
            {
                path: '/genius',
                text: 'BOSS',
                icon: 'job',
                title: 'BOSS列表',
                component: Genius,
                hide: user.type === 'boss'
            },
            {
                path: '/msg',
                text: '消息',
                icon: 'msg',
                title: '消息列表',
                component: Msg
            },
            {
                path: '/me',
                text: '我',
                icon: 'user',
                title: '个人中心',
                component: User
            }
        ]
        
        return (
            <div>
                <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>
                <div style={{marginTop:45}}>
                    <Switch>
                        {
                            navList.map(v=>(
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                    <NavLinkBar data={navList}></NavLinkBar>
                </div>
            </div>
        )
    }
}

export default DashBoard
