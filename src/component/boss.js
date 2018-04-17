import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {getUserList} from '../redux/chatuser.redux'
import UserCard from '../component/usercard'
@connect(
    state=>state.chatuser,
    {getUserList}
)

class Boss extends React.Component {
    componentDidMount() {
        console.log('boss component didmount!')
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