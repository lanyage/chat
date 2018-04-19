import io from 'socket.io-client'
import axios from 'axios'
const socket = io('ws://localhost:9093')

//获取聊天列表
const MSG_LIST = 'MSG_LIST'
//读取信息
const MSG_RECV = 'MSG_RECV'
//标示已读
// const MSG_READ = 'MSG_READ'


const initState = {
    chatmsg: [],
    unread: 0, //实时更新未读消息的数量
    users: {}
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            // console.log('payload', action.payload)
            return { ...state, chatmsg: action.payload.msgs,users:action.payload.users,unread: action.payload.msgs.filter(v => !v.read).length}
        case MSG_RECV:
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + 1 }
        // case MSG_READ:
        default:
            return state
    }
}
function msgList(msgs, users) {
    return { type: MSG_LIST, payload: { msgs, users } }
}
function msgRecv(msg) {
    return { type: MSG_RECV, payload: msg }
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function (data) {

            dispatch(msgRecv(data))
        })
    }
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs, res.data.users))
                }
            })
    }
}