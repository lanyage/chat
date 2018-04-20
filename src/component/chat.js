import React from 'react'
import { List, InputItem, NavBar, Icon, Grid } from 'antd-mobile'
import { connect } from 'react-redux'
import { getMsgList, sendMsg, recvMsg } from '../redux/chat.redux'
import { getChatId } from '../util'
@connect(
    state => state,
    { getMsgList, sendMsg, recvMsg }
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = { text: '', msg: [], showEmoji: false }
    }
    handleSubmit() {
        const from = this.props.user._id
        const to = this.props.match.params.user
        const msg = this.state.text
        this.props.sendMsg({ from, to, msg })
        this.setState({ text: '' })
    }
    /** 页面加载得时候会进行和socket.io的通信 */
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            this.props.getMsgList()
            this.props.recvMsg()
        }

    }
    /** 用于解决bug */
    fixCarousel() {
        setTimeout(function () {
            window.dispatchEvent(new Event('resize'))
        }, 0)
    }
    render() {
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v => v)
            .map(v => ({ text: v }))


        const userid = this.props.match.params.user
        const Item = List.Item
        const users = this.props.chat.users
        /** 可能一瞬间还没渲染完,如果出于任何原因没有获取到数据的话,那么就不渲染,return null即可 */
        if (!users[userid])
            return null

        const chatid = getChatId(userid, this.props.user._id)
        // console.log(chatid)
        const chatmsgs = this.props.chat.chatmsg.filter(v => v.chatid === chatid)
        return (
            <div id='chat-page'>
                <NavBar mode='dark'
                    icon={<Icon type='left'></Icon>}
                    onLeftClick={() => this.props.history.goBack()}
                >
                    {users[userid].name}
                </NavBar>
                {
                    chatmsgs.map(v => {
                        const avatar = require(`./avatarimgs/${users[v.from].avatar}.png`)
                        return v.from === userid ? (
                            <List key={v._id} >
                                <Item
                                    thumb={avatar}
                                >{v.content}</Item>
                            </List>
                        ) : (
                                <List key={v._id} >
                                    <Item
                                        extra={<img src={avatar} alt='' />}
                                        className='chat-me'
                                    >{v.content}</Item>
                                </List>
                            )
                    })
                }

                <div className='stick-footer'>
                    <List>
                        <InputItem
                            placeholder='请输入'
                            value={this.state.text}
                            onChange={v => this.setState({ text: v })}
                            extra={
                                <div>
                                    <span
                                        role='img'
                                        aria-label='emoji'
                                        style={{ marginRight: 15 }}
                                        onClick={() => {
                                            this.setState({ showEmoji: !this.state.showEmoji })
                                            this.fixCarousel()
                                        }}
                                    >😃</span>
                                    <span onClick={() => this.handleSubmit()}>发送</span>
                                </div>
                            }
                        ></InputItem>
                    </List>
                    {/* 轮播图会有一个bug */}
                    {this.state.showEmoji ?
                        <Grid
                            data={emoji}
                            columnNum={9}
                            carouselMaxRow={4}
                            isCarousel={true}
                            onClick={el => {
                                this.setState({ text: this.state.text + el.text })
                                console.log(el)
                            }}
                        /> : null}

                </div>
            </div>
        )
    }
}

export default Chat