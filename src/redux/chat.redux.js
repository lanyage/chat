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
            return { ...state, chatmsg: action.payload.msgs,users:action.payload.users,unread: action.payload.msgs.filter(v => !v.read && v.to === action.payload.userid).length}
        case MSG_RECV:
            const n = action.payload.to === action.userid ? 1 : 0
           
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread + n}
        // case MSG_READ:
        default:
            return state
    }
}
function msgList(msgs, users,userid) {
    return { type: MSG_LIST, payload: { msgs, users,userid } }
}
function msgRecv(msg,userid) {
    return { type: MSG_RECV, payload: msg , userid}
}
export function sendMsg({ from, to, msg }) {
    return dispatch => {
        socket.emit('sendmsg', { from, to, msg })
    }
}

export function recvMsg() {
    return (dispatch,getState) => {
        socket.on('recvmsg', function (data) {
            const userid = getState().user._id
            dispatch(msgRecv(data,userid))
        })
    }
}

export function getMsgList() {
    /** getState可以获取redux我们所有的状态 */
    return (dispatch,getState) => {
        axios.get('/user/getmsglist')
            .then(res => {
                if (res.status === 200 && res.data.code === 0) {
                    const userid = getState().user._id
                    
                    dispatch(msgList(res.data.msgs, res.data.users, userid))
                }
            })
    }
}