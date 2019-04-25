import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from 'react-redux'
import { Switch,Route, } from 'react-router-dom'

import NavLinkBar from '../../component/navlinkbar/navlinkbar'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
    state=>state,
    { getMsgList, recvMsg }
)
class Dashboard extends Component {
    constructor(props) {
        super(props)
        console.log('boss')
    }
    componentDidMount() {
        if (!this.props.chat.chatmsg.length) {
            // 获取聊天消息
            this.props.getMsgList()
            // 获取最新一条的信息
            this.props.recvMsg()
        }
    }
    render() {
        const user = this.props.user
        // 当前路径
        const {pathname} = this.props.location
        // boss路径显示牛人列表
        // genius路径显示boss列表
        const dataList = [
            {
                path: '/boss',
                text: '牛人',
                icon: 'boss',
                title: '牛人列表',
                component: Boss,
                hide: user.type == 'genius'
            },
            {
                path: '/genius',
                text: 'boss',
                icon: 'job',
                title:'BOSS列表',
                component: Genius,
                hide: user.type == 'boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg,
            },
            {
                path: '/me',
                text: '个人中心',
                icon: 'user',
                title: '个人中心列表',
                component: User,
            }
        ]
        return (
            <div>
                {/* 如果当前的this.props.location.pathname == 其中dataList中的path 的话 就渲染这个的titile  */}
                <NavBar className="fixd-header" mode="dark">{dataList.find(v=>v.path==pathname).title}</NavBar>
                {/* <h2 >底部</h2> */}
                <div style={{marginTop:50}}>
                    <Switch>
                        {dataList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component} />
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={dataList}></NavLinkBar>
            </div>
        );
    }
}

export default Dashboard;