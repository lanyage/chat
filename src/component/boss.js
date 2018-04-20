import React from 'react'
// import axios from 'axios'
import {connect} from 'react-redux'
// import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../redux/chatuser.redux'
import UserCard from '../component/usercard'

@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component {
    /** 页面加载之后需要马上加载牛人列表 */
    componentDidMount() {
        this.props.getUserList('genius')
    }
    render() {
        return (
            <div>
               <UserCard userlist={this.props.userlist}></UserCard>
            </div>
        )
    }
}

export default Boss