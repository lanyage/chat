import React from "react"
import { NavBar } from 'antd-mobile'
import { Switch, Route } from "react-router-dom"
import { getMsgList, recvMsg } from '../redux/chat.redux'

import { connect } from 'react-redux'
import NavLinkBar from '../component/navlinkbar'
import Genius from '../component/genius'
import Boss from '../component/boss'
import User from '../component/user'
import Msg from '../component/msg'

@connect(
    state => state,
    {getMsgList,recvMsg}
)
class DashBoard extends React.Component {
    componentDidMount() {
        /** 这是重点,回头必须得搞清楚 */
        if (!this.props.chat.chatmsg.length) {
			this.props.getMsgList()
			this.props.recvMsg()
		}
    }
    
    render() {
        
        const { pathname } = this.props.location
        const user = this.props.user
        
        /** NavLinkBar的列表 */
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
                {/* dashboard主要就是一个上面的navbar和下面的navLinkbar,使用find函数来查找数组中符合的一个 */}
                <NavBar className='fixed-header' mode='dark'>{navList.find(v => v.path === pathname).title}</NavBar>

                <div style={{ marginTop: 45 }}>
                    {/* 这是子路由 */}
                    <Switch>
                        {
                            navList.map(v => (
                                // map的时候必须要存在key,并且key必须是唯一的
                                <Route key={v.path} path={v.path} component={v.component}></Route>
                            ))
                        }
                    </Switch>
                </div>
            
                {/* 这是下面的tabbars */}
                <NavLinkBar data={navList}></NavLinkBar>
            </div>
        )
    }
}

export default DashBoard
