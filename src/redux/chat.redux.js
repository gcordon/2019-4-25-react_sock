import axios from 'axios'
import io from 'socket.io-client'
const server = io('ws://localhost:9093')
// 获取消息
const MSG_LIST = 'MSG_LIST'
// 读取消息 =》 单条
const MSG_RECV = 'MSG_RECV'
// 标识已读
const MSG_READ = 'MSG_READ'

const initState = {
    // 消息
    chatmsg: [],
    // 全部用户信息
    users: {},
    // 未读消息数量
    unread: 0,
}

export function chat(state=initState, action) {
    switch (action.type) {
        // 多条
        case MSG_LIST:
            return { ...state,users: action.payload.users, chatmsg: action.payload.msgs, unread: action.payload.msgs.filter(v=> !v.read&&v.to==action.payload.userid).length }
        // 单条信息 
        case MSG_RECV:
            // 如果消息的to等于当前的登录id的话 就是 + 1 否者 + 0
            console.log(action.payload)
            const n = action.payload.to==action.userid ? 1 : 0
            return { ...state, chatmsg: [...state.chatmsg, action.payload], unread: state.unread+n }
        default:
            return state
    }
}

// 接收单条消息、当前登录的用户id
function msgRecv(msg, userid) {
    return { userid, type: MSG_RECV, payload: msg}
}
export function recvMsg() {
    return (dispatch, getState) => {
        server.on('recvmsg', function(data) {
            const userid = getState().user._id
            dispatch(msgRecv(data, userid))
        })
    }
}
// 发送消息
export function sendMsg({from, to, msg}) {
    return dispatch => {
        server.emit('sendmsg', { from, to, msg })
    }
}

/**** 获取当前聊天用户之间的消息  ***/
// 聊天 、 所以用户 、当前登录的用户id
function msgList(msgs, users, userid) {
    return { type: MSG_LIST, payload: { msgs, users, userid }}
}
export function getMsgList() {
    return (dispatch,getState)=>{
        axios.get('/user/msglist')
            .then(data => {
                if (data.status == 200 && data.data.code == 0) {
                    const userid = getState().user._id
                    // 聊天内容、全部用户、当前登录的用户id
                    dispatch(msgList(data.data.msgs, data.data.users, userid))
                }
            })
    }
}

