import axios from 'axios'
import { checkRouter } from '../util.js'

const AUTH_SUCCESS = 'AUTH_SUCCESS'
const GET_DATA = 'GET_DATA'
const ERROR_MSG = 'ERROR_MSG'
const LOGOUT = 'LOGOUT'

const initState = {
    // isAuth: false,
    msg: '',
    user: '',
    // pwd: '',
    type: '',
    RedirectRouterTo: '', // 跳转的页面
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...action,
                //  isAuth: true,
                  msg: '', RedirectRouterTo: checkRouter(action.payload), ...action.payload
            }  // payload是用户的信息
            break;
        case ERROR_MSG:
            return { ...action, 
                // isAuth: false,
                 msg: action.msg }
            break;
        case GET_DATA:
            return { ...action, ...action.payload}
        case LOGOUT:
            return { ...initState, RedirectRouterTo: '/login'}
        default:
            return state
            break;
    }
}
export function logoutsubmit() {
    return { type: LOGOUT }
}
//  注册或登录 提示信息
// function auth_success(data) {
function auth_success(obj) {
    // 过滤密码
    const {pwd, ...data} = obj
    return { type: AUTH_SUCCESS, payload: data }
}
// 错误信息 + 类型
export function error_msg(msg) {
    return { msg, type: ERROR_MSG }
}
// 获取用户信息
export function getData(info) {
    return { type: GET_DATA, payload: info}
}
export function update(data) {
    return dispatch => {
        axios.post('/user/update', data)  
            .then(res => {
                if (res.status == 200 && res.data.code == 0) {
                    dispatch(auth_success(res.data.data))
                } else {
                    dispatch(error_msg(res.data.msg))
                }
            })
    }
}
export function login({ user, pwd }) {
    if (!user || !pwd) {
        return error_msg('账号或密码不能为空')
    }
    return dispatch => {
        axios.post('/user/login', { user, pwd })
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(auth_success(res.data.data))
                } else {
                    dispatch(error_msg(res.data.msg))
                }
            })
    }
}
export function register({ user, pwd, repeatpwd, type }) {
    if (!user || !pwd || !type) {
        return error_msg('值不能为空')
    }
    if (pwd != repeatpwd) {
        return error_msg('密码和确认密码不一致')
    }
    return dispatch => {
        axios.post('/user/register', { user, pwd, type })
            .then(res => {
                if (res.status == 200 && res.data.code === 0) {
                    dispatch(auth_success(res.data.data))
                } else {
                    dispatch(error_msg(res.data.msg))
                }
            })
    }
}