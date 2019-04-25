import axios from 'axios'
const USER_LIST = 'USER_LIST'
const initState = {
    userlist: []
}

export function chatuser(state=initState, action) {
    switch (action.type) {
        case USER_LIST:
            return {...state, userlist: action.payload}
            break;
        default:
            return state
            break;
    }
}
function userList(data) {
    return { type: USER_LIST, payload:data }
}
// 获取用户信息 (boss或genius)
export function getUserList(type) {
    return dispatch => {
        axios.get('/user/list?type='+type)
            .then(re => {
                if (re.status == 200 && re.data.code == 0) {
                    dispatch(userList(re.data.data))
                }
            })
    }
}






