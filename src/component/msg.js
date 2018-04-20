import React from 'react'
import { connect } from 'react-redux'
import { List,Badge } from 'antd-mobile'
@connect(
    state => state
)
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    render() {
        if (!this.props.chat.chatmsg.length) {
            return null
        }

        const Item = List.Item
        const Brief = Item.Brief
        const userid = this.props.user._id
        const userinfo = this.props.chat.users

        // console.log(userid)
        // console.log(userinfo)
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        })
        const chatList = Object.values(msgGroup).sort((a,b)=> {
            const a_last = this.getLast(a).createtime
            const b_last = this.getLast(b).createtime
            // console.log(a_last)
            // console.log(b_last)
           
            return b_last - a_last
        })
        
        // 按照聊天用户分组，根据chatid

        //1.eslint代码考验工具
        //2.react16的错误处理机制
        //3.react性能优化

        return (
            <List>
                {
                    chatList.map(v => {
                        const lastItem = this.getLast(v)
                        const tartgetId = v[0].from === userid ? v[0].to : v[0].from
                        const unreadNum = v.filter(v => !v.read && v.to === userid).length
                        /** 如果这个用户是不存在的,那么就不渲染 */
                        if (!userinfo[tartgetId]) {
                            return null
                        }
                        return (
                            <List key={lastItem._id}>
                                <Item
                                    arrow='horizontal'
                                    extra={<Badge text={unreadNum}></Badge>}
                                    thumb={require(`./avatarimgs/${userinfo[tartgetId].avatar}.png`)}
                                    onClick={()=>{
                                        this.props.history.push(`/chat/${tartgetId}`)
                                    }}
                                >
                                    {lastItem.content}
                                    <Brief>{userinfo[tartgetId].name}</Brief>
                                </Item>
                            </List>
                        )
                    })
                }
            </List>
        )
    }
}

export default Msg