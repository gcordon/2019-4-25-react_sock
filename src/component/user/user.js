import React, { Component } from 'react';
import { Result, List, WhiteSpace, Button, Modal } from 'antd-mobile';
import {connect} from 'react-redux'
import { Redirect} from 'react-router-dom'
// 清除用户cookie
import BrowserCookies from 'browser-cookies'

import { logoutsubmit} from '../../redux/user.redux'

@connect(
    state=>state.user,
    { logoutsubmit }
)
class User extends Component {
    constructor(props) {
        super(props)
        this.logout = this.logout.bind(this)
    }
    logout() {
        console.log('logout')
        const alert = Modal.alert;
        alert('Delete', '确定退出登录吗?', [
            { text: '返回', onPress: () => console.log('cancel') },
            { text: '确定', onPress: () => {
                BrowserCookies.erase('userid')
                this.props.logoutsubmit()
            } },
        ])
    }
    render() {
        const props = this.props
        const Item = List.Item
        const Brief = Item.Brief
        const alert = Modal.alert;
        return props.avatar ? (
            <div>
                <Result 
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt={props.avatar}/>}
                    title={props.user}
                    message={<div>公司：{props.company?props.company:null}</div>}
                />
                <List renderHeader={() => '简介'}>
                    <Item
                        multipleLine
                        platform="android"
                    >
                            {props.title}
                    </Item>
                    <Item>
                        {props.desc.split('\n').map(d => <Brief key={d}>{d}</Brief>)}
                        <WhiteSpace />
                        薪资：{props.money ? <Brief >{props.money}</Brief> : null}
                    </Item>
                </List>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ) : <Redirect to={props.RedirectRouterTo} />
    }
}

export default User;