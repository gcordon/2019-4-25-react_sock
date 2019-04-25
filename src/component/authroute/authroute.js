import axios from 'axios'
import React from 'react';
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import { getData } from '../../redux/user.redux'

@withRouter 
@connect(
    null,
    {getData}
)
class Authroute extends React.Component {
    constructor(props) {
        super(props)
        // 如果已经在登录注册页面则不执行 =>   判断是否已经登录 =》 获取信息
        const pathRoute = ['/register', '/login']
        const pathName = this.props.location.pathname
        if (pathRoute.indexOf(pathName) == 0) {
            return
        }
        // 判断是否已经登录 =》 获取信息
        axios.get('/user/info')
            .then(re => {
                if (re.status == 200 && re.data.code == 0) {
                    console.log('已登录')
                    // 用户在redux中保存当前的用户信息
                    this.props.getData(re.data.data)
                } else {
                    // 如果没有获取到用户信息则跳转到登录页面
                    this.props.history.push('/login')
                    console.log('未登录')
                }
            })
            // 是否登录
            // 现在的url地址 login是否需要跳转的

            // 用户的type 身份是boss还是牛人
            // 用户是否完整信息（选择头像  个人简介）
    }
    render() {
        return null
    }
}

export default Authroute;